import React from 'react';
import { useRecoilValue } from 'recoil';
import { expectedTotalSelectors, budgetPropertySelectors } from './Store';
import { budgetProps } from './BudgetProps';

type SpentDataProps = {
  bIndex: number
}

const SpentData = ({ bIndex }: SpentDataProps) => {
  
  const actualTotal = useRecoilValue(expectedTotalSelectors(bIndex));
  const budget = useRecoilValue(budgetPropertySelectors({ bIndex, property: budgetProps.budget }));

  return (
    <div className='total-row'>
      <p><strong>Actual:</strong></p>
      <p>Current: {'$'.concat(actualTotal.toLocaleString())}</p>
      <p>Remaining: {'$'.concat((budget - actualTotal).toLocaleString())}</p>
    </div>
  )
}

export default SpentData