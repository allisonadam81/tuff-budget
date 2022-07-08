import React, { useContext } from 'react';
import BudgetCard from './BudgetCard'
import { BudgetArray, HandleFunctions, Budget } from '../../types';
import { budgetArrayAtom } from './Store';
import { useRecoilValue } from 'recoil';

// type BudgetCardListProps = {
//   budgetArray: BudgetArray
// }

const BudgetCardList = (props: any) => {
  const budgetArray = useRecoilValue(budgetArrayAtom)
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