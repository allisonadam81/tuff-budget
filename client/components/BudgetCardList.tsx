import React, { useContext } from 'react';
import BudgetCard from './BudgetCard'
import { BudgetArray, HandleFunctions } from '../../types';


interface BudgetCardListProps {
  budgetArray: BudgetArray,
}

const BudgetCardList: React.FC<BudgetCardListProps> = ({ budgetArray }) => {

  return (
    <div className='budget-list-container'>
      {budgetArray.map((budget, index) => <BudgetCard
         key={budget.budgetID}
         bIndex={index}
         budgetObject={budget}/>
      )}
    </div>

  )
}

export default BudgetCardList;