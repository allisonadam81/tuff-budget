import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { budgetProps } from './BudgetProps';
import { useRecoilValue } from 'recoil';
import { budgetAtoms, budgetPropertySelectors, userAtom } from './Store';
import { Budget } from '../../types';

import BudgetMetaDataEditing from './BudgetMetaDataEditing';

type BudgetMetaDataProps = {
  bIndex: number,
}

const BudgetMetaData = ({ bIndex }: BudgetMetaDataProps) => {
  const userID = useRecoilValue(userAtom);
  
  const budgetObject: Budget = useRecoilValue(budgetAtoms(bIndex));
  const { title, budget, budgetID } = budgetObject; // do not need line items right now.


  const [editing, setEditing] = useState(false);

  let url = `http://localhost:3000/budgets/${userID}/${budgetID}`

  const deleteBudget = (e: React.FormEvent) => {
    e.preventDefault();
    axios.delete(url)
      .then((response: any) => {
        return;
      })
      .catch((err: any) => console.log(err));
  }

  if (!editing) {
    return (
      <div className='budget-meta-data'>
        <div className='budget-title-button'>
          <h1 onClick={(e: any) => setEditing(true)}>{title}</h1>
          <button
            className='delete-budget-button'
            onClick={(e: any) => deleteBudget(e)}
          >
            Delete Budget
          </button>
        </div>
        <h4 onClick={(e: any) => setEditing(true)}><b>Budget: {'$'.concat(budget.toLocaleString())}</b></h4>
      </div>
    )
  } else {
    return (
      <BudgetMetaDataEditing
        bIndex={bIndex}
        setEditing={setEditing}
      />
    )
  }
}

export default BudgetMetaData