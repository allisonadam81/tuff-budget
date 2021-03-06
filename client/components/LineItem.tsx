import React, { useContext, useState } from 'react';
import { LineItemType, ButtonEvent, InputEvent, OnClickEvent } from '../../types';
import { CrudContext } from './CrudContext';
import { budgetReducerActionTypes as types } from './BudgetReducer';
import LineItemEditing from './LineItemEditing';
import axios from 'axios';

type LineItemProps = {
  lineItem: LineItemType,
  budgetID: number,
  bIndex: number,
  lIndex: number,
}

const LineItem: React.FC<LineItemProps> = ({ lineItem, budgetID, bIndex, lIndex }) => {

  const { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID } = lineItem;

  let url = `http://localhost:3000/lineItems/${budgetID}/${lineItemID}`

  const { dispatch } = useContext(CrudContext);

  const colorTheme = {
    default: 'green',
    editing: 'green',
    processing: 'grey'
  };


  const [ editing, setEditing ] = useState(false);
  const [ theme, setTheme ] = useState(colorTheme.default);

  const deleteLineItem = (e: ButtonEvent) => {
    e.preventDefault();
    axios.delete(url)
    .then((response: any) => {
      dispatch({ type: types.deleteLineItem, payload: { lineItemID, bIndex, lIndex }})
      return;
      })
    .catch((err: Error) => console.log(err));
  }

  if (!editing) {
    return (
  <div className='line-item' onClick={(e: OnClickEvent) => setEditing(true)}>
    <div>{description}</div>
    <div>{category}</div>
    <div>{'$'.concat(expAmount.toLocaleString())}</div>
    <div>{'$'.concat(actAmount.toLocaleString())}</div>
    <div>{isFixed ? '✔️' : '✖️' }</div>
    <div>{isRecurring ? '✔️' : '✖️' }</div>
    <div className='delete-button'>
      <button onClick={(e: ButtonEvent) => deleteLineItem(e)}>X</button>
    </div>
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
      lIndex={lIndex}
      bIndex={bIndex}
      setEditing={setEditing}
      editing={editing}
    />
  )}
}

export default LineItem