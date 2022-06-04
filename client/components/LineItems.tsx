import React, { useContext, useState } from 'react';
import { LineItem } from '../../types';
import CrudContext from './crudContext';

interface LineItemProps {
  userID?: number,
  lineItemObject: LineItem,
  budgetID: number
}

const LineItems: React.FC<LineItemProps> = props => {
  const { lineItemObject, budgetID } = props;
  const { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID } = lineItemObject;
  const { myCrudCall } = useContext(CrudContext);
  // convert non-spent actual amounts to zero
  let actToDisplay = actAmount;
  if (actToDisplay === -1) actToDisplay = 0;

  return (
    <div className='line-item'>
      <div>{description}</div>
      <div>{category}</div>
      <div>{'$'.concat(expAmount.toLocaleString())}</div>
      <div>{'$'.concat(actToDisplay.toLocaleString())}</div>
      <div>{isFixed ? '✔️' : '✖️' }</div>
      <div>{isRecurring ? '✔️' : '✖️' }</div>
      <div className='delete-button'><button onClick={(e: any) => myCrudCall(e, 'DELETE', budgetID, lineItemID)}>X</button></div>
    </div>
  )
}

export default LineItems;