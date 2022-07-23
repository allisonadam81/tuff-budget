import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { budgetAtoms, budgetPropertySelectors, userAtom } from './Store';
import { Budget } from '../../types';
import { curryFetch, urlFunc } from './curryFuncs';
import BudgetMetaDataEditing from './BudgetMetaDataEditing';
import { Methods } from './Actions';

type BudgetMetaDataProps = {
  bIndex: number,
}

const BudgetMetaData = ({ bIndex }: BudgetMetaDataProps) => {
  const userID = useRecoilValue(userAtom);
  
  const budgetObject: Budget = useRecoilValue(budgetAtoms(bIndex));
  const { title, budget, budgetID } = budgetObject; // do not need line items right now.


  const [editing, setEditing] = useState(false);

  const url = urlFunc('budget', userID, budgetID)

  const urlConfig = curryFetch(url);

  const thenHandler = (res: any) => {
    // set some state
    }
  const catchHandler = (err: Error) => console.log(err);

  const handleClick = urlConfig(Methods.delete)(null)(thenHandler)(catchHandler)
  // const deleteBudget = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   axios.delete(url)
  //     .then((response: any) => {
  //       return;
  //     })
  //     .catch((err: any) => console.log(err));
  // }

  if (!editing) {
    return (
      <div className='budget-meta-data'>
        <div className='budget-title-button'>
          <h1 onClick={(e: any) => setEditing(true)}>{title}</h1>
          <button
            className='delete-budget-button'
            onClick={handleClick}
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
        urlConfig={urlConfig}
        bIndex={bIndex}
        setEditing={setEditing}
      />
    )
  }
}

export default BudgetMetaData