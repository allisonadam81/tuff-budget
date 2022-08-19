import React, { useState, useCallback, useDeferredValue, useMemo } from 'react'
import ExpectedData from './ExpectedData';
import SpentData from './SpentData';
import { useRecoilValue, selectorFamily } from 'recoil';
import { budgetPropertySelectors, actualTotalSelectors, expectedTotalSelectors } from './Store';
import { BudgetProps } from './Actions';
import { LineItemArray, LineItemType } from '../../types';

type ExpectedSpentDataProps = {
  bIndex: number
}

const ExpectedSpentData = ({ bIndex }: ExpectedSpentDataProps) => {

  return (
    <>
      <ExpectedData
        bIndex={bIndex}
      />
      <SpentData
        bIndex={bIndex}
      />
    </>
  )
}

export default ExpectedSpentData