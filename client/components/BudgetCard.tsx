import React from 'react';
import LineItems from './LineItems'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Budget, LineItemArray, LineItem } from '../../types';
import { CrudContext } from './CrudContext';
import LineItemForm from './LineItemForm';

interface BudgetCardProps {
  budgetObject: Budget
  bIndex: number
}

const BudgetCard: React.FC<BudgetCardProps> = ({ bIndex, budgetObject }) => {
const { lineItems, title, budget, budgetID } = budgetObject;
const { myCrudCall } = useContext(CrudContext);

const lineItemArray: JSX.Element[] = [];
lineItems.map((lineItem, index) => {
  lineItemArray.push(<LineItems
  key={lineItem.lineItemID}
  lineItemObject={lineItem}
  liIndex={index}
  bIndex={bIndex}
  budgetID={budgetID}
  />)
});

// calculate the total amount budgeted
const getExpectedTotal = () => {
  let sum = 0;
  lineItems.forEach((li:LineItem) => sum += li.expAmount);
  return sum;
}

// calculate the total amount spent
const getActualTotal = () => {
  let sum = 0;
  lineItems.forEach((li:LineItem) => {
    // only include actual if it is a spent amount (> 1)
    if (li.actAmount >= 0) sum += li.actAmount;
  });
  return sum;
}

const expectedTotal = getExpectedTotal();
const actualTotal = getActualTotal();

//iterate through the open and create a new line per object
return (
  <div className='budget-card'>
    
    {/* BUDGET META DATA */}
    <div className='budget-meta-data'>
      <div className='budget-title-button'>
        <h1>{title}</h1>
        <button 
          className = 'delete-budget-button'
          onClick = {(e) => myCrudCall(e, null, 'DELETE', budgetID)}
        >
          Delete Budget
        </button>
      </div>
      <h4><b>Budget: {'$'.concat(budget.toLocaleString())}</b></h4>
    </div>

    {/* LINE ITEM DATA */}
    <div className='line-item-container'>
      <div className='line-item-header'>
        <div><b>Description:</b></div>
        <div><b>Category:</b></div>
        <div><b>Expected Amount:</b></div>
        <div><b>Actual Spent:</b></div>
        <div><b>Is Fixed?</b></div>
        <div><b>Is Recurring?</b></div>
      </div>
      {lineItemArray}
    </div>

    {/* BUDGET VS EXPECTED/SPENT DATA */}
    <div className='total-remaining'>
      <div className='total-row'>
        <p><strong>Expected:</strong></p>
        <p>Current: {'$'.concat(expectedTotal.toLocaleString())}</p>
        <p>Remaining: {'$'.concat((budget - expectedTotal).toLocaleString())}</p>
      </div>
      <div className='total-row'>
        <p><strong>Actual:</strong></p>
        <p>Current: {'$'.concat(actualTotal.toLocaleString())}</p>
        <p>Remaining: {'$'.concat((budget - actualTotal).toLocaleString())}</p>
      </div>
    </div>

    {/* ADD LINE ITEM FORM -- TURN THIS INTO A COMPONENT */}
    <LineItemForm
      budgetID={budgetID}
      bIndex={bIndex}
    />
  </div>
  )
}

export default BudgetCard;