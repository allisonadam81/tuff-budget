import React from 'react';
import { useRecoilValue } from 'recoil';
import { BudgetProps } from './Actions';
import { expectedTotalSelectors, budgetAtoms } from './Store';

type ExpectedDataProps = {
  bIndex: number
}

const ExpectedData: React.FC<ExpectedDataProps> = ({ bIndex }) => {
  
  const expectedTotal = useRecoilValue(expectedTotalSelectors(bIndex));
  const { budget } = useRecoilValue(budgetAtoms(bIndex));

  return (
    <div className='total-row'>
      <p><strong>Expected:</strong></p>
      <p>Current: {'$'.concat(expectedTotal.toLocaleString())}</p>
      <p>Remaining: {'$'.concat((budget - expectedTotal).toLocaleString())}</p>
    </div>
  )
}

export default ExpectedData