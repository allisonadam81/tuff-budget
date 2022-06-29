import React, { useContext } from 'react';
import BudgetCard from './BudgetCard'
import { BudgetArray, HandleFunctions, Budget } from '../../types';


interface BudgetCardListProps {
  budgetArray: BudgetArray,
}

const BudgetCardList: React.FC<BudgetCardListProps> = ({ budgetArray }) => {
  // iterate through the budget array, and each object goes in an array matching the bIndex
  return (
    <>
    {budgetArray.map((budgetObject, i) => {
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