import { atom, selector, selectorFamily, atomFamily } from 'recoil';
import { BudgetArray, LineItemArray, LineItemType, Budget } from '../../types';
import { GetRecoilValue, SetRecoilState } from 'recoil';
import { cheapClone } from './curryFuncs';
import { Methods } from './Actions';
import LineItem from './LineItem';

export type ActionObject = {
  type: string,
  payload: any
}

export const userAtom = atom({
  key: 'user',
  default: 2
});

export const budgetArrayAtom = atom({
  key: 'budgetArray',
  default: []
});

export const budgetAtoms = atomFamily({
  key: 'budgetAtomFamily',
  default: selectorFamily({
    key: 'budgetAtomFamilySelectorFamily',
    get: (bIndex: number) => ({ get }) => get(budgetArrayAtom)[bIndex],
    set: (bIndex: number) => ({ get, set }, action: ActionObject) => {
      const budget: any = get(budgetAtoms(bIndex));
      switch (action.type) {
        case (Methods.patch) : { // this is editing budget values
          set (budget, { ...budget, ...action.payload });
          return;
        };
        case ('ADD LINE ITEM GOES HERE') : {
          const { lineItems } = budget

          set(budget, { ...budget, lineItems: [ ...lineItems, action.payload]})
        }
      }
    }
  })
});

export const lineItemArrayAtoms = atomFamily({
  key: 'lineItemArrayAtomFamily',
  default: selectorFamily({
    key: 'lineItemArraySelectorFamily',
    get: (bIndex: number) => ({ get }) => get(budgetAtoms(bIndex)).lineItems,
    set: (bIndex: number) => ({ get, set }, action: ActionObject) => {
      const lineItems = get(lineItemArrayAtoms(bIndex));
      switch (action.type) {
        case ('WHATEVER ADD LINE ITEM IS') : {
          set(lineItems, [ ...lineItems, action.payload ])
        }
        case ('DELETE LINE ITEM') : {
          const { lIndex } = action.payload;
          set(lineItems, lineItems.filter((li: LineItemType, i: number) => i !== lIndex ? li : ))
        }
      }
    }
  })
})


export const lineItemAtoms = atomFamily({
  key: 'lineItemAtomFamily',
  default: selectorFamily({
    key: 'lineItemAtomFamilySelectorFamily',
    get: (indexInfo: { bIndex: number, lIndex: number }) => ({ get }) => {
      const { bIndex, lIndex } = indexInfo;
      const lineItems = get(lineItemArrayAtoms(bIndex));
      return lineItems[lIndex];
    },
    set: (indexInfo: { bIndex: number, lIndex: number }) => ({ get, set }, action: ActionObject) => {
      const { bIndex, lIndex } = indexInfo;
      const lineItem = get(lineItemAtoms(indexInfo));
      set(lineItem, { ...lineItem, ...action.payload });
    }
  })
});




// budget/lineItem Atoms here are currently selector families, but kept the names to prevent import problems.
// export const budgetAtoms = selectorFamily({
//   key: 'budgetAtomFamilySelectorFamily',
//   get: (bIndex: number) => ({ get }) => get(budgetArrayAtom)[bIndex],
//   set: (bIndex: number) => ({ get, set, reset }, action: ActionObject ) => {
//     const budget = get(budgetArrayAtom)[bIndex];
//     switch (action.type) {
//       case (Methods.patch) : {
//         set(budget, Object.assign(budget, action.payload))
//       }
//     }
//   }
// })

// export const lineItemAtoms = selectorFamily({
//   key: 'lineItemAtomFamilySelectorFamily',
//   get: (indexInfo: { bIndex: number, lIndex: number }) => ({ get }) => {
//     const { bIndex, lIndex } = indexInfo;
//     const lineItems = get(budgetAtoms(bIndex)).lineItems;
//     return lineItems[lIndex];
//   },
//   set: (indexInfo: { bIndex: number, lIndex: number }) => ({ get, set }, action: ActionObject) => {
//     const { bIndex, lIndex } = indexInfo;
//     const budget = get(budgetAtoms(bIndex));
//     const lineItemArray = budget.lineItems
//     const lineItem = lineItemArray[lIndex];
//     switch (action.type) {
//       case (Methods.patch) : {
//         set (lineItem, Object.assign(lineItem, action.payload))
//       }
//       case (Methods.post) : {
//         set (lineItemArray, [ ...lineItemArray, action.payload ])
//       }
//       case (Methods.delete) : {
//         set(lineItemArray, lineItemArray.filter((lineItem: LineItemType) => )
//       }
//     }
//   }
// })

export const budgetPropertySelectors = selectorFamily({
  key: 'budgetPropertySelector',
  get: (properties: { bIndex: number, property: string }) => ({ get }) => {
    const { bIndex, property } = properties;
    return get(budgetAtoms(bIndex))[property];
  },
  set: (properties: { bIndex: number, property: string }) => ({ get, set, reset }, newProp: any) => {
    const { bIndex, property } = properties;
    const budgetProp = get(budgetAtoms(bIndex))[property]
  }
})

export const lineItemPropertySelector = selectorFamily({
  key: 'lineItemPropertySelector',
  get: (properties: { bIndex: number, lIndex: number, property: string }) => ({ get }) => {
    const { bIndex, property, lIndex } = properties;
    return get(budgetAtoms(bIndex)).lineItems[lIndex][property];
  }
})

export const actualTotalSelectors = selectorFamily({
  key: 'actualTotalSelectors',
  get: (bIndex: number) => ({ get }) => {
    const { lineItems } = get(budgetAtoms(bIndex));
    return lineItems.reduce((acc: number, cur: LineItemType) => {
      return cur.actAmount >= 0 ? acc += cur.actAmount : acc
    }, 0)
  }
})

export const expectedTotalSelectors = selectorFamily({
  key: 'expectedTotalSelectors',
  get: (bIndex: number) => ({ get }) => {
    const { lineItems } = get(budgetAtoms(bIndex));
    return lineItems.reduce((acc: number, cur: LineItemType) => {
      return cur.expAmount >= 0 ? acc += cur.expAmount : acc
    }, 0)
  }
})

