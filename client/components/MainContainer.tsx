import React, { Suspense, useState, useLayoutEffect, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { numHandler, changeHandler, urlFunc, curryFetch, curryChange } from './utils';
import axios from 'axios';
import { BudgetArray, LineItemType, LineItemArray, Budget, InputEvent, FormEvent } from '../../types';
import { Methods, LineItemActions } from './Actions';
import BudgetCard from './BudgetCard';
import AddBudgetForm from './AddBudgetForm';
import BudgetCardContainer from './BudgetCardContainer';
import { budgetArrayAtom, userAtom } from './Store';
import { useRecoilState, useRecoilValue } from 'recoil';

const MainContainer: React.FC = () => {
  const budgetID = 0;
  const userID = useRecoilValue(userAtom);

  const [ budgetArray, setBudgetArray ] = useRecoilState(budgetArrayAtom);

  const url = urlFunc('budgets', userID, budgetID);

  const budgetFetch = async () => {
    try {
      const { data } = await axios.get<BudgetArray>(url)
      setBudgetArray(prevBudgetArray => data)
      return;
    }
    catch (error) {
      console.log(error)
      return;
    }
  }

  useEffect(() => {
    budgetFetch()
  }, [])
  
  return (
    <div>
      <>
        <BudgetCardContainer/>
      </>
      <AddBudgetForm
        url={url}
        setBudgetArray={setBudgetArray}
      />
      {/* </Suspense> */}
    </div>
  )
}

export default MainContainer;
