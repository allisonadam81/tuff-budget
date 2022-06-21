import React, { useContext } from 'react';
import BudgetCard from './BudgetCard'
import { BudgetArray, HandleFunctions, Budget } from '../../types';


interface BudgetCardListProps {
  budgetArray: BudgetArray,
}

const BudgetCardList: React.FC<BudgetCardListProps> = ({ budgetArray }) => {
  // iterate through the budget array, and each object goes in an array matching the bIndex
  const budgetCardsArray = new Array(budgetArray.length);

  budgetArray.forEach((budget: Budget, i: Number) => {
    //console.log(budgetCardsArray);
    budgetCardsArray[budget.bIndex] = <BudgetCard
    key={budget.budgetID}
    budgetObject={budget}
    />
  })
  return (
    <>
    {budgetCardsArray}
    </>
  )
}

export default BudgetCardList;