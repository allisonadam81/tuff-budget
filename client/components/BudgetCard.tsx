import React, { useState, useEffect, useContext } from 'react';
import LineItemContainer from './LineItemContainer';
import { useRecoilValue } from 'recoil';
import { budgetAtoms } from './Store';
import axios from 'axios';
import { Budget, LineItemArray, LineItemType } from '../../types';
import LineItemForm from './LineItemForm';
import LineItemHeader from './LineItemHeader';
import ExpectedSpentData from './ExpectedSpentData';
import BudgetMetaData from './BudgetMetaData';
import { BudgetProps } from './Actions';

type BudgetCardProps = {
  bIndex: number
}

const BudgetCard: React.FC<BudgetCardProps> = ({ bIndex }) => {

// const lineItems = useRecoilValue(budgetPropertySelectors({ bIndex, property: BudgetProps.lineItems }));
//console.log('triggered from budget card ')
// const { lineItems } = useRecoilValue(budgetAtoms(bIndex));
  
return (
  <div className='budget-card'>
    <BudgetMetaData
    bIndex={bIndex}
    />
    <div className='line-item-container'>
      <>
        <LineItemHeader/>
      </>
        <LineItemContainer
        key={`LineItemArray${bIndex}`}
        bIndex={bIndex}
        />
    </div>

    {/* BUDGET VS EXPECTED/SPENT DATA */}
    <div className='total-remaining'>
      <ExpectedSpentData
      bIndex={bIndex}
      />
    </div>

    {/* ADD LINE ITEM FORM -- TURN THIS INTO A COMPONENT */}
    <LineItemForm
      bIndex={bIndex}
    />
  </div>
  )
}
  export default BudgetCard;