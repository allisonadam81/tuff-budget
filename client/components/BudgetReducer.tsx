import { LineItem } from '../../types'

export function budgetReducer (state: any, action: any) {
  const copyState = JSON.parse(JSON.stringify(state));
  const { budgetArray } = copyState;
  switch (action.type) {
    case 'RELOAD_BUDGETS' : {
      return { ...state, budgetArray: action.payload }
    }
    case 'DELETE_BUDGET' : {
      const { bIndex, budgetID } = action.payload;
      const newBudgetArray = budgetArray.filter((budget: any, i: number) => i !== bIndex)
      return { ...state, newBudgetArray }
    }
    case 'CREATE_BUDGET' : {
      budgetArray.push(action.payload);
      return {...state, budgetArray };
    }
    case 'PATCH_BUDGET' : {
      const { fields, budgetID, bIndex } = action.payload;
      return 'do not patch please'
    }
    case 'DELETE_LINEITEM' : {
      const { budgetID, lineItemID, bIndex, liIndex } = action.payload;
      let { lineItemArray } = budgetArray[bIndex]
      lineItemArray = lineItemArray[liIndex].filter((lineItem: any, i: number) => i !== liIndex)
      return { ...state, budgetArray }
    }
    case 'CREATE_LINEITEM' : {
      const { budgetID, lineItem, bIndex } = action.payload;
      budgetArray[bIndex].lineItemArray.push(lineItem);
      return { ...state, budgetArray }
    }
    case 'PATCH_LINEITEM' : {
      return 'do not patch yet please';
    }
    default : {
      return state
    }
  }
};