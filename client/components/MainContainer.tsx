import React, { Suspense, useState, useLayoutEffect } from 'react';
// const BudgetCardList = React.lazy (() => import ('./BudgetCardList'));
import { numHandler, changeHandler, urlFunc, curryFetch, curryChange } from './curryFuncs';
import axios from 'axios';
import { BudgetArray, LineItemType, LineItemArray, Budget, InputEvent, FormEvent } from '../../types';
import { Methods, LineItemActions } from './Actions';
import BudgetCard from './BudgetCard';
import { budgetArrayAtom, userAtom } from './Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { stringify } from 'querystring';

const MainContainer: React.FC = () => {
  const budgetID = 0;
  const userID = useRecoilValue(userAtom);

  const [ budgetArray, setBudgetArray ] = useRecoilState(budgetArrayAtom);


  const url = urlFunc('budget', userID, budgetID);

  const budgetFetch = async () => {
    const result: any = await axios.get(url)
    setBudgetArray(result.data)
    return;
  }

  useLayoutEffect(() => {
    budgetFetch()
  }, [])

    const thenHandler = (res: any) => {
      // set state
      }
      
  const catchHandler = (err: Error) => console.log(err);

  const [{title, budget}, setNewBudget ] = useState<{title: string, budget: number|''}>({title: '', budget: ''})
  const handleSubmit = curryFetch(url)(Methods.post)({title, budget })(thenHandler)(catchHandler)

  const curryConfig = curryChange({title, budget})(setNewBudget)
  
  return (
    <div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {/* <BudgetCardList/> */}
      <>
        {budgetArray.map((el: Budget, i: number) => <BudgetCard key={`budget${el.budgetID}`} bIndex={i}/>)}
      </>
      <div className='create-budget-form'>
        <form onSubmit = {handleSubmit}>
          <input className='name-of-project' value={title} placeholder='name of project'
          onChange={curryConfig(LineItemActions.title)}>
          </input>
          <input className='budget-amount' value={budget} placeholder='budget'
          onChange={curryConfig(LineItemActions.budget)}></input>
          <button>Add Budget</button>
        </form>
      </div>
      {/* </Suspense> */}
    </div>
  )
}

export default MainContainer;
