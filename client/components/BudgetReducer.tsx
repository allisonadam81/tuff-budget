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
      return { ...state, budgetArray }
    }
    case budgetReducerActionTypes.createBudget : {
      budgetArray.push(action.payload);
      return {...state, budgetArray };
    }
    case budgetReducerActionTypes.patchBudget : {
      const { editedObject, budgetID, bIndex } = action.payload;
      const editingBudget = budgetArray[bIndex];
      console.log(editedObject);
      Object.assign(editingBudget, editedObject);
      return { ...state, budgetArray }
    }
    case budgetReducerActionTypes.deleteLineItem : {
      const { budgetID, lineItemID, bIndex, lIndex } = action.payload;
      let { lineItems } = budgetArray[bIndex];
      delete lineItems[lIndex];
      lineItems = lineItems.flat();
      return { ...state, budgetArray }
    }
    case budgetReducerActionTypes.createLineItem : {
      const { budgetID, newLineItem, bIndex } = action.payload;
      budgetArray[bIndex].lineItems.push(newLineItem);
      return { ...state, budgetArray }
    }
    case budgetReducerActionTypes.patchLineItem : {
      const { lIndex, bIndex, editedObject } = action.payload;
      const editingLineItem = budgetArray[bIndex].lineItems[lIndex];
      Object.assign(editingLineItem, editedObject);
      return { ...state, budgetArray }
    }
    default : {
      console.log('uh oh')
      return state
    }
  }
};