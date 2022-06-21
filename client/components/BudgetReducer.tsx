import { LineItemType } from '../../types'

export const budgetReducerActionTypes = {
  reloadBudgets: 'RELOAD_BUDGETS',
  deleteBudget: 'DELETE_BUDGET',
  createBudget: 'CREATE_BUDGET',
  patchBudget: 'PATCH_BUDGET',
  createLineItem: 'CREATE_LINEITEM',
  patchLineItem: 'PATCH_LINEITEM',
  deleteLineItem: 'DELETE_LINEITEM'
}

export function budgetReducer (state: any, action: any) {
  // create a copy of the state and pull the budgetArray off of it to be manipulated throughout the reducer.
  const copyState = JSON.parse(JSON.stringify(state));
  let { budgetArray } = copyState;
  switch (action.type) {
    case budgetReducerActionTypes.reloadBudgets : {
      return { ...state, budgetArray: action.payload }
    }
    case budgetReducerActionTypes.deleteBudget : {
      const { bIndex } = action.payload;
      delete budgetArray[bIndex]
      budgetArray = budgetArray.flat();
      for (let i = bIndex; i < budgetArray.length; i++){
        budgetArray[i].bIndex = i - 1;
      }
      console.log('new budget array', budgetArray);
      return { ...state, budgetArray }
    }
    case budgetReducerActionTypes.createBudget : {
      budgetArray.push(action.payload);
      return {...state, budgetArray };
    }
    case budgetReducerActionTypes.patchBudget : {
      const { fields, budgetID, bIndex } = action.payload;
      return 'do not patch please'
    }
    case budgetReducerActionTypes.deleteLineItem : {
      const { budgetID, lineItemID, bIndex, liIndex } = action.payload;
      const { lineItemArray } = budgetArray[bIndex]
      budgetArray[bIndex].lineItemArray = lineItemArray.filter((lineItem: LineItemType, i: number) => i !== liIndex)
      return { ...state, budgetArray }
    }
    case budgetReducerActionTypes.createLineItem : {
      const { budgetID, lineItem, bIndex } = action.payload;
      budgetArray[bIndex].lineItemArray.push(lineItem);
      return { ...state, budgetArray }
    }
    case budgetReducerActionTypes.patchLineItem : {
      return 'do not patch yet please';
    }
    default : {
      console.log('uh oh')
      return state
    }
  }
};