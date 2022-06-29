import React, { useContext, useState, useEffect } from 'react';
import { CrudContext } from './CrudContext'
import axios from 'axios';
import { budgetReducerActionTypes as types } from './BudgetReducer';

import BudgetMetaDataEditing from './BudgetMetaDataEditing';

type BudgetMetaDataProps = {
  bIndex: number,
  budgetID: number,
  title: string
  budget: number
}

const BudgetMetaData = ({ bIndex, budgetID, title, budget }: BudgetMetaDataProps) => {
  // create an onclick to swtich to input forms and create a patch method.
  const [ editing, setEditing ] = useState(false);

  const { dispatch, userID } = useContext(CrudContext);

  let url = `http://localhost:3000/budgets/${userID}/${budgetID}`

  const deleteBudget = (e: any) => {
    axios.delete(url)
    .then((response: any) => {
      dispatch({type: types.deleteBudget, payload: { bIndex }})
      return;
    })
    .catch((err: any) => {
      console.log(err);
      return;
    })
  }


  if (!editing) {
    return (
    <div className='budget-meta-data'>
    <div className='budget-title-button'>
      <h1 onClick={(e:any) => setEditing(true)}>{title}</h1>
      <button 
        className='delete-budget-button'
        onClick = {(e: any) => deleteBudget(e)}
      >
        Delete Budget
      </button>
    </div>
    <h4 onClick={(e:any) => setEditing(true)}><b>Budget: {'$'.concat(budget.toLocaleString())}</b></h4>
  </div>
  )} else {
    return (
      <BudgetMetaDataEditing
      bIndex={bIndex}
      budgetID={budgetID}
      title={title}
      budget={budget}
      editing={editing}
      setEditing={setEditing}
      />
    )
  }
}

export default BudgetMetaData