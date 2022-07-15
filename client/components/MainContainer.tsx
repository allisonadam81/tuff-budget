import React, { Suspense, createContext, useState, useLayoutEffect, useReducer } from 'react';
// const BudgetCardList = React.lazy (() => import ('./BudgetCardList'));
import { numHandler, changeHandler } from './curryFuncs';
import axios from 'axios';
import { BudgetArray, LineItemType, LineItemArray, Budget, InputEvent, FormEvent } from '../../types';
import BudgetCard from './BudgetCard';
import { budgetArrayAtom, userAtom } from './Store';
import { useRecoilState, useRecoilValue } from 'recoil';

const MainContainer: React.FC = () => {
  const budgetID = 0;

  const [ budgetArray, setBudgetArray ] = useRecoilState(budgetArrayAtom);

  const userID = useRecoilValue(userAtom);

  let url = `http://localhost:3000/budgets/${userID}/${budgetID}`

  const budgetFetch = async () => {
    const result: any = await axios.get(url)
    setBudgetArray(result.data)
    return;
  }

  useLayoutEffect(() => {
    budgetFetch()
  }, [])


  const addBudget = (e: FormEvent, budget: Budget) => {
    e.preventDefault();
    axios.post(url, budget)
      .then((res: any) => {
        budget = res.data;
        return;
      })
      .catch((err: any) => console.log(err));
      return;
  }
  
  const [ title, setTitle ] = useState('');
  const [ budget, setBudget ] = useState<number|string>('');
  
  return (
    <div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {/* <BudgetCardList/> */}
      <>
        {budgetArray.map((el: Budget, i: number) => <BudgetCard key={`budget${el.budgetID}`} bIndex={i}/>)}
      </>
      <div className='create-budget-form'>
        <form onSubmit = {(e: FormEvent) => {
          const newBudget: Budget = {
            title, budget: Number(budget), budgetID, lineItems: []
          }
            addBudget(e, newBudget);
            setTitle('');
            setBudget('');
            return;
          }}>
          <input className='name-of-project' value={title} placeholder='name of project' onChange={changeHandler(setTitle)}>
          </input>
          <input className='budget-amount' value={budget} placeholder='budget' onChange={numHandler(setBudget)}></input>
          <button>Add Budget</button>
        </form>
      </div>
      {/* </Suspense> */}
    </div>
  )
}

export default MainContainer;
