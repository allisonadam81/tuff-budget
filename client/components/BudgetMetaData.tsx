import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import { budgetAtoms, budgetPropertySelectors, userAtom } from './Store';
import { Budget } from '../../types';
import { curryFetch, urlFunc } from './utils';
import BudgetMetaDataEditing from './BudgetMetaDataEditing';
import { Methods } from './Actions';

type BudgetMetaDataProps = {
  bIndex: number,
}

const BudgetMetaData = ({ bIndex }: BudgetMetaDataProps) => {
  const userID = useRecoilValue(userAtom);
  
  const [ budgetObject, setBudgetObject ] = useRecoilState(budgetAtoms(bIndex));
  const { title, budget, budgetID } = budgetObject; // do not need line items right now.


  const [editing, setEditing] = useState(false);

  const url = urlFunc('budgets', userID, budgetID)

  const urlConfig = curryFetch(url);

  const thenHandler = (res: any) => {
    
    setBudgetObject({type: Methods.delete})
  }

  const catchHandler = (err: Error) => console.log(err);

  const handleClick = urlConfig(Methods.delete)(null)(thenHandler)(catchHandler);

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