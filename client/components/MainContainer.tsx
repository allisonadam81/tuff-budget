import React, { Suspense, createContext, useState, useLayoutEffect, useReducer } from 'react';
// const BudgetCardList = React.lazy (() => import ('./BudgetCardList'));
import BudgetCardList from './BudgetCardList';
import axios from 'axios';
import { BudgetArray, LineItemType, LineItemArray, Budget, InputEvent, FormEvent } from '../../types';
import { CrudContext } from './CrudContext';
import BudgetCard from './BudgetCard';
import { budgetReducer, budgetReducerActionTypes as types } from './BudgetReducer';



const MainContainer: React.FC = () => {
  const budgetID = 0;

  const [{ budgetArray, userID}, dispatch ] = useReducer(budgetReducer, { budgetArray: [], userID: 2 });


  let url = `http://localhost:3000/budgets/${userID}/${budgetID}`

  const budgetFetch = async () => {
    const result = await axios.get(url)
    dispatch({type: types.reloadBudgets, payload: result.data})
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
        dispatch({type: types.createBudget, payload: budget});
        return;
      })
      .catch((err: any) => console.log(err));
      return;
  }

  const newBudgetActions = {
    title: 'TITLE',
    budget: 'BUDGET'
  }
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');

  function newBudgetHandleChange (e: InputEvent, action: string) {
    switch (action) {
      case newBudgetActions.title : {
        return setTitle(e.target.value)
      }
      case newBudgetActions.budget : {
        return setBudget(e.target.value.replace(/\D/g, ''))
      }
      default : {
        return 'incorrect field sent'
      }
    }
  }
  
  return (
    <CrudContext.Provider value={{ userID, dispatch }}>
    <div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <BudgetCardList
      budgetArray={budgetArray}
      />
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
          <input className='name-of-project' value={title} placeholder='name of project' onChange={(e: InputEvent) => newBudgetHandleChange(e, newBudgetActions.title)}>
          </input>
          <input className='budget-amount' value={budget} placeholder='budget' onChange={(e: InputEvent) => newBudgetHandleChange(e, newBudgetActions.budget)}></input>
          <button>Add Budget</button>
        </form>
      </div>
      {/* </Suspense> */}
    </div>
    </CrudContext.Provider>
  )
}

export default MainContainer;
