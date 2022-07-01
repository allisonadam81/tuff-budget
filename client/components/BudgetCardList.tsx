import React, { useContext } from 'react';
import BudgetCard from './BudgetCard'
import { BudgetArray, HandleFunctions, Budget } from '../../types';


type BudgetCardListProps = {
  budgetArray: BudgetArray
}

const BudgetCardList: React.FC<BudgetCardListProps> = ({ budgetArray }) => {

  return (
    <>
    {budgetArray.map((budgetObject: Budget, i: number) => {
      return <BudgetCard
      key={`budget${budgetObject.budgetID}`}
      budgetObject={budgetObject}
      bIndex={i}
      />
    })}
    </>
  )
}

export default BudgetCardList;