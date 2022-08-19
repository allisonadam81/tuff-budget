import React from 'react';
import { useRecoilValue } from 'recoil';
import { BudgetProps } from './Actions';
import { expectedTotalSelectors, budgetPropertySelectors } from './Store';

type ExpectedDataProps = {
  bIndex: number
}

const ExpectedData = ({ bIndex }: ExpectedDataProps) => {
  
  const expectedTotal = useRecoilValue(expectedTotalSelectors(bIndex));
  const budget = useRecoilValue(budgetPropertySelectors({ bIndex, property: BudgetProps.budget }));

  return (
    <div className='total-row'>
      <p><strong>Expected:</strong></p>
      <p>Current: {'$'.concat(expectedTotal.toLocaleString())}</p>
      <p>Remaining: {'$'.concat((budget - expectedTotal).toLocaleString())}</p>
    </div>
  )
}

export default ExpectedData