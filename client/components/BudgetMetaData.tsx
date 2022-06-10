import React, { useContext, useState, useEffect } from 'react';
import { CrudContext } from './CrudContext'

type BudgetMetaDataProps = {
  bIndex: number,
  budgetID: number,
  title: string
  budget: number
}

const BudgetMetaData = ({ bIndex, budgetID, title, budget }: BudgetMetaDataProps) => {

  const { myCrudCall } = useContext(CrudContext);

  return (
    <div className='budget-meta-data'>
    <div className='budget-title-button'>
      <h1>{title}</h1>
      <button 
        className = 'delete-budget-button'
        onClick = {(e) => myCrudCall(e, { bIndex }, 'DELETE', budgetID, null)}
      >
        Delete Budget
      </button>
    </div>
    <h4><b>Budget: {'$'.concat(budget.toLocaleString())}</b></h4>
  </div>
  )
}

export default BudgetMetaData