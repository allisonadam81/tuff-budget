import { atom, selector, selectorFamily, atomFamily } from 'recoil';
import { BudgetArray, LineItemArray, LineItemType, Budget, ActionObject } from '../../types';
import { GetRecoilValue, SetRecoilState } from 'recoil';
import { cheapClone } from './utils';
import { Methods } from './Actions';
import LineItem from './LineItem';

export const userAtom = atom({
  key: 'user',
  default: 2
});

export const budgetArrayAtom = atom({
  key: 'budgetArray',
  default: []
});

export const budgetAtoms = selectorFamily({
  key: 'budgetSelectorFamily',
  get: (bIndex: number) => ({ get }) => get(budgetArrayAtom)[bIndex],
  set: (bIndex: number) => ({ get, set }, action: ActionObject) => {
    // edit a budget. Delete a budget. add a budget.
    const budgetArray = cheapClone(get(budgetArrayAtom));
    switch (action.type) {
      case (Methods.post) : {
        budgetArray.push({ ...action.payload, lineItems: [] });
        set(budgetArrayAtom, budgetArray);
        return;
      }
      case (Methods.delete) : {
        budgetArray.splice(bIndex, 1);
        set(budgetArrayAtom, budgetArray);
        return;
      }
      case (Methods.patch) : {
        budgetArray[bIndex] = Object.assign(budgetArray[bIndex], action.payload);
        set(budgetArrayAtom, budgetArray);
        return;
      }
    }
  }
});

type IndexInfo = {
  bIndex: number,
  lIndex?: number
}

export const lineItemAtoms = selectorFamily<LineItemType, IndexInfo>({
  key: 'lineItemSelectorFamily',
  get: (indexInfo) => ({ get }) => {
    const { bIndex, lIndex } = indexInfo;
    return get(budgetArrayAtom)[bIndex].lineItems[lIndex];
  },
  set: (indexInfo) => ({ get, set }, action) => {
    // edit a budget. Delete a budget. add a budget.
    const { bIndex, lIndex } = indexInfo;
    const budgetArray = cheapClone(get(budgetArrayAtom));
    const budget = budgetArray[bIndex];
    switch (action.type) {
      case (Methods.post) : {
        //console.log(action.payload)
        budget.lineItems.push(action.payload);
        set(budgetArrayAtom, budgetArray);
        return;
      }
      case (Methods.delete) : {
        budget.lineItems.splice(lIndex, 1);
        set(budgetArrayAtom, budgetArray);
        return;
      }
      case (Methods.patch) : {
        budget.lineItems[lIndex] = Object.assign(budget.lineItems[lIndex], action.payload)
        set(budgetArrayAtom, budgetArray);
        return;
      }
    }
  }
})

// export const budgetAtoms = atomFamily({
//   key: 'budgetAtomFamily',
//   default: selectorFamily({
//     key: 'budgetAtomFamilySelectorFamily',
//     get: (bIndex: number) => ({ get }) => get(budgetArrayAtom)[bIndex],
//     set: (bIndex: number) => ({ get, set }, action: ActionObject) => {
//       set(budgetArrayAtom, )
//     }
//   })
// });

// export const lineItemArrayAtoms = atomFamily({
//   key: 'lineItemArrayAtomFamily',
//   default: selectorFamily({
//     key: 'lineItemArraySelectorFamily',
//     get: (bIndex: number) => ({ get }) => get(budgetAtoms(bIndex)).lineItems,
//     set: (bIndex: number) => ({ get, set }, action: ActionObject) => {
//       console.log('triggered');
//       switch (action.type) {
//         case (Methods.post) : {
//           set(lineItemArrayAtoms(bIndex), [ ...get(lineItemArrayAtoms(bIndex)), action.payload ])
//         }
//         case (Methods.delete) : {
//           const { lIndex } = action.payload;
//           set(lineItemArrayAtoms(bIndex), get(lineItemArrayAtoms(bIndex)).filter((li: LineItemType, i: number) => {
//             if (i !== lIndex) return li;
//           }))
//         }
//       }
//     }
//   })
// })


// export const lineItemAtoms = atomFamily({
//   key: 'lineItemAtomFamily',
//   default: selectorFamily({
//     key: 'lineItemAtomFamilySelectorFamily',
//     get: (indexInfo: { bIndex: number, lIndex: number }) => ({ get }) => {
//       const { bIndex, lIndex } = indexInfo;
//       const lineItems = get(lineItemArrayAtoms(bIndex));
//       return lineItems[lIndex];
//     },
//     set: (indexInfo: { bIndex: number, lIndex: number }) => ({ get, set }, action: ActionObject) => {
//       const { bIndex, lIndex } = indexInfo;
//       const lineItem = get(lineItemAtoms(indexInfo));
//       console.log('lineitem ', lineItem)
//       set(lineItemAtoms(indexInfo), Object.assign(lineItem, action.payload));
//     }
//   })
// });




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

