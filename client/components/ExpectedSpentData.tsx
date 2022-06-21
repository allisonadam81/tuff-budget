import React, { useState, useCallback, useDeferredValue, useMemo } from 'react'
import ExpectedData from './ExpectedData';
import SpentData from './SpentData';
import { LineItemArray, LineItemType } from '../../types';

type ExpectedSpentDataProps = {
  lineItems: LineItemArray,
  budget: number
}

const ExpectedSpentData = ({ lineItems, budget }: ExpectedSpentDataProps) => {

  let expectedTotal = 0, actualTotal = 0;
    lineItems.map((li: LineItemType) => {
      expectedTotal += Number(li.expAmount);
      if (li.actAmount >= 0) actualTotal += Number(li.actAmount);
    })
    

  return (
    <>
      <ExpectedData
        budget={budget}
        expectedTotal={expectedTotal}
      />
      <SpentData
        budget={budget}
        actualTotal={actualTotal}
      />
    </>
  )
}

export default ExpectedSpentData