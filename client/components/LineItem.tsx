import React, { useContext, useState } from 'react';
import { LineItemType } from '../../types';
import { CrudContext } from './CrudContext';
import LineItemEditing from './LineItemEditing';

type LineItemProps = {
  lineItem: LineItemType,
  budgetID: number,
  liIndex: number,
  bIndex: number
}

const LineItem = ({ lineItem, budgetID, liIndex, bIndex }: LineItemProps) => {
  const { myCrudCall } = useContext(CrudContext);

  const colorTheme = {
    default: 'green',
    editing: 'green',
    processing: 'grey'
  };

  const { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID } = lineItem;

  const [ editing, setEditing ] = useState(false);
  const [ theme, setTheme ] = useState(colorTheme.default);

  if (!editing) {
    return (
  <div className='line-item' onClick={(e: any) => setEditing(true)}>
    <div>{description}</div>
    <div>{category}</div>
    <div>{'$'.concat(expAmount.toLocaleString())}</div>
    <div>{'$'.concat(actAmount.toLocaleString())}</div>
    <div>{isFixed ? '✔️' : '✖️' }</div>
    <div>{isRecurring ? '✔️' : '✖️' }</div>
    <div className='delete-button'><button onClick={(e: any) => myCrudCall(e, null, 'DELETE', budgetID, lineItemID)}>X</button></div>
  </div>

  )} else {
    return (
    <LineItemEditing
      budgetID={budgetID}
      lineItemID={lineItemID}
      description={description}
      category={category}
      expAmount={expAmount}
      actAmount={actAmount}
      isFixed={isFixed}
      isRecurring={isRecurring}
      liIndex={liIndex}
      bIndex={bIndex}
      setEditing={setEditing}
      editing={editing}
    />
  )}
}

export default LineItem