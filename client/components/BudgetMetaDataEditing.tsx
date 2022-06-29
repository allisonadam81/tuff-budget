import React, { useState, useContext } from 'react'
import { CrudContext } from './CrudContext';
import axios from 'axios';
import { budgetReducerActionTypes as types } from './BudgetReducer';

type BudgetMetaDataEditingProps = {
  bIndex: number,
  budget: number,
  title: string,
  budgetID: number,
  editing: boolean,
  setEditing: any
}

const budgetActions = {
  title: 'title',
  budget: 'budget'
}

const BudgetMetaDataEditing = ({ bIndex, budget, title, budgetID, editing, setEditing }: BudgetMetaDataEditingProps) => {
  const { dispatch, userID } = useContext(CrudContext);

  let url = `http://localhost:3000/budgets/${userID}/${budgetID}`


  const [ editedObject, setEditedObject ]: any = useState({});

  const handleChange = (e: any, type: string) => {
    let { value } = e.target;
    if (type === budgetActions.title){
      return setEditedObject({ ...editedObject, [type]: value })
    }
    if (type = budgetActions.budget){
      return setEditedObject({ ...editedObject, [type]: Number(value.replace(/\D/g, '')) })
    }
  }

const handleSubmit = (e: any) => {
  e.preventDefault();
  dispatch({ type: types.patchBudget, payload: { bIndex, editedObject }})
  axios.patch(url, editedObject)
  .then(data => {
    const { budget } = data.data;
    dispatch({ type: types.patchBudget, payload: { bIndex, editedObject: budget }})
  })
  .catch(err => console.log(err));
  setEditedObject({})
  setEditing(false);
  return;
}
  
  return (
    <div className='budget-meta-data'>
      <form onSubmit={(e: any) => handleSubmit(e)}>
        <input value={(editedObject.title !== undefined)
          ? editedObject.title
          : title}
          onChange={(e: any) => handleChange(e, budgetActions.title)}>
        </input>
        <input value={(editedObject.budget !== undefined)
          ? editedObject.budget
          : budget.toLocaleString()}
          onChange={(e: any) => handleChange(e, budgetActions.budget)}>
        </input>
        <button type='submit' >Submit</button>
      </form>
  </div>
  )
}

export default BudgetMetaDataEditing