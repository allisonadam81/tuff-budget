import { atom, selector, selectorFamily, atomFamily } from 'recoil';
import { BudgetArray, LineItemArray, LineItemType, Budget } from '../../types';
import { GetRecoilValue, SetRecoilState } from 'recoil';


export const userAtom = atom({
  key: 'user',
  default: 2
});

export const budgetArrayAtom = atom({
  key: 'budgetArray',
  default: []
});

// export const budgetAtoms = atomFamily({
//   key: 'budgetAtomFamily',
//   default: selectorFamily({
//     key: 'budgetAtomFamilySelectorFamily',
//     get: (bIndex: number) => ({ get }) => get(budgetArrayAtom)[bIndex]
//   })
// })

// export const lineItemAtoms = atomFamily({
//   key: 'lineItemAtomFamily',
//   default: selectorFamily({
//     key: 'lineItemAtomFamilySelectorFamily',
//     get: (indexInfo: { bIndex: number, lIndex: number }) => ({ get }) => {
//       const { bIndex, lIndex } = indexInfo;
//       const lineItems = get(budgetAtoms(bIndex)).lineItems;
//       return lineItems[lIndex];
//     }
//   })
// })


// budget/lineItem Atoms here are currently selector families, but kept the names to prevent import problems.
export const budgetAtoms = selectorFamily({
  key: 'budgetAtomFamilySelectorFamily',
  get: (bIndex: number) => ({ get }) => get(budgetArrayAtom)[bIndex]
})

export const lineItemAtoms = selectorFamily({
  key: 'lineItemAtomFamilySelectorFamily',
  get: (indexInfo: { bIndex: number, lIndex: number }) => ({ get }) => {
    const { bIndex, lIndex } = indexInfo;
    const lineItems = get(budgetAtoms(bIndex)).lineItems;
    return lineItems[lIndex];
  }
})

export const budgetPropertySelectors = selectorFamily({
  key: 'budgetPropertySelector',
  get: (properties: { bIndex: number, property: string }) => ({ get }) => {
    const { bIndex, property } = properties;
    return get(budgetAtoms(bIndex))[property];
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

