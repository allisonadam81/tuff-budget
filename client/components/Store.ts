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

export const budgetArrayAtom = atom<BudgetArray>({
  key: 'budgetArray',
  default: []
});

type IndexInfo = {
  bIndex: number,
  lIndex?: number
}


export const budgetAtoms = atomFamily<Budget, number>({
  key: 'budgetAtomFamily',
  default: selectorFamily({
    key: 'budgetAtomFamilySelectorFamily',
    get: (bIndex) => ({ get }) => get(budgetArrayAtom)[bIndex],
    set: (bIndex) => ({ get, set }, newValue) => {
      console.log('set fired off budgetAtoms ', bIndex)
    }
  })
});

export const lineItemArrayAtoms = atomFamily<LineItemArray, number>({
  key: 'lineItemArrayAtomFamily',
  default: selectorFamily({
    key: 'lineItemArraySelectorFamily',
    get: (bIndex) => ({ get }) => get(budgetAtoms(bIndex)).lineItems,
    set: (bIndex) => ({ get, set }, newValue) => {
      console.log('lineItemArrayAtom set triggered ', bIndex);
        }
      })
    });


export const lineItemAtoms = atomFamily<LineItemType, IndexInfo>({
  key: 'lineItemAtomFamily',
  default: selectorFamily({
    key: 'lineItemAtomFamilySelectorFamily',
    get: (indexInfo) => ({ get }) => {
      const { bIndex, lIndex } = indexInfo;
      const lineItems = get(lineItemArrayAtoms(bIndex));
      return lineItems[lIndex];
    },
    set: (indexInfo) => ({ get, set }, newValue) => {
      console.log('lineItemAtoms set triggered ', indexInfo)
    }
  })
});


export const actualTotalSelectors = selectorFamily<number, number>({
  key: 'actualTotalSelectors',
  get: (bIndex) => ({ get }) => {
    const { lineItems } = get(budgetAtoms(bIndex));
    let sum = 0;
    lineItems.forEach((el: LineItemType) => {
      sum += el.actAmount
    })
    return sum
  }
})

export const expectedTotalSelectors = selectorFamily<number, number>({
  key: 'expectedTotalSelectors',
  get: (bIndex) => ({ get }) => {
    const { lineItems } = get(budgetAtoms(bIndex));
    let sum = 0;
    lineItems.forEach((el: LineItemType) => {
      sum += el.expAmount
    })
    return sum
  }
})

