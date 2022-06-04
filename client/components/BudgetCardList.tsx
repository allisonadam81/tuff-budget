import React, { useContext } from 'react';
import BudgetCard from './BudgetCard'
import { BudgetArray, HandleFunctions } from '../../types';


interface BudgetCardListProps {
  budgetArray: BudgetArray,
  userID: number,
}

const BudgetCardList: React.FC<BudgetCardListProps> = props => {
  const { budgetArray, userID } = props;
  console.log(budgetArray);

  return (
    <div className='budget-list-container'>
      {budgetArray.map((budget, i) => <BudgetCard
         key={budget.budgetID} 
         userID={userID} 
         budgetObject={budget}/>
      )}
    </div>

  )
}

export default BudgetCardList;