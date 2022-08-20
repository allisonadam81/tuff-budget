import React, { useState } from 'react';
import { BudgetArray } from '../../types';
import { LineItemActions, Methods } from './Actions';
import { AxiosResponse } from 'axios';
import { curryFetch, curryChange } from './utils';

type AddBudgetFormProps = {
  url: string,
  setBudgetArray: any
}

type NewBudget = {
  title: string,
  budget: number
}

const AddBudgetForm: React.FC<AddBudgetFormProps> = ({ url, setBudgetArray }) => {
  const initialBudget = {
    title: '',
    budget: 0
  }

  const [ newBudget, setNewBudget ] = useState<NewBudget>(initialBudget);
  const { title, budget } = newBudget

  const thenHandler = (res: AxiosResponse ) => {
    setBudgetArray((prevArray: BudgetArray): BudgetArray => {
      return [...prevArray, { ...res.data, lineItems: [] }]
    });
    setNewBudget(initialBudget);
  }
  
  const catchHandler = (err: Error|AxiosResponse) => console.log(err);


  const handleSubmit = curryFetch(url)(Methods.post)(newBudget)(thenHandler)(catchHandler);

  const curryConfig = curryChange(newBudget)(setNewBudget);

  return (
    <div className='create-budget-form'>
    <form onSubmit = {handleSubmit}>
      <input className='name-of-project' value={title} placeholder='name of project'
      onChange={curryConfig(LineItemActions.title)}>
      </input>
      <input className='budget-amount' value={budget ? budget.toLocaleString() : ''} placeholder='budget'
      onChange={curryConfig(LineItemActions.budget)}></input>
      <button>Add Budget</button>
    </form>
  </div>
  )
}

export default AddBudgetForm