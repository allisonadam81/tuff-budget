import React from 'react';
import BudgetCard from './BudgetCard'
import { BudgetArray, HandleFunctions, Budget } from '../../types';
import { budgetArrayAtom } from './Store';
import { useRecoilValue } from 'recoil';

const BudgetCardList: React.FC = () => {

  const budgetArray: BudgetArray = useRecoilValue(budgetArrayAtom)
  
  return (
    <>
    {budgetArray.map((budgetObject: Budget, i: number) => {
      return <BudgetCard
      key={`budget${budgetObject.budgetID}`}
      bIndex={i}
      />
    })}
    </>
  )
}

export default BudgetCardList;