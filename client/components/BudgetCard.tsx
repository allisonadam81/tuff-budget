import React from 'react';
import LineItems from './LineItems'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Budget, LineItemArray, LineItemType } from '../../types';
import { CrudContext } from './CrudContext';
import LineItemForm from './LineItemForm';
import LineItemHeader from './LineItemHeader';
import ExpectedSpentData from './ExpectedSpentData';
import BudgetMetaData from './BudgetMetaData';

interface BudgetCardProps {
  budgetObject: Budget
  bIndex: number
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budgetObject, bIndex }) => {

const { lineItems, title, budget, budgetID } = budgetObject;

//iterate through the open and create a new line per object
return (
  <div className='budget-card'>
    <BudgetMetaData
    title={title}
    budget={budget}
    budgetID={budgetID}
    bIndex={bIndex}
    />
    <div className='line-item-container'>
      <>
        <LineItemHeader/>
      </>
      <>
        <LineItems
        lineItems={lineItems}
        bIndex={bIndex}
        budgetID={budgetID}
      />
      </>
    </div>

    {/* BUDGET VS EXPECTED/SPENT DATA */}
    <div className='total-remaining'>
      <ExpectedSpentData
      lineItems={lineItems}
      budget={budget}
      />
    </div>

    {/* ADD LINE ITEM FORM -- TURN THIS INTO A COMPONENT */}
    <LineItemForm
      budgetID={budgetID}
      bIndex={bIndex}
      lineItems={lineItems}
    />
  </div>
  )
}

export default BudgetCard;