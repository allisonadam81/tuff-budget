import React, { useContext, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { lineItemAtoms } from './Store';
import { LineItemType, ButtonEvent, InputEvent, OnClickEvent } from '../../types';
import { budgetReducerActionTypes as types } from './BudgetReducer';
import LineItemEditing from './LineItemEditing';
import axios from 'axios';

type LineItemProps = {
  bIndex: number,
  lIndex: number,
}

const LineItem: React.FC<LineItemProps> = ({ bIndex, lIndex }) => {
  const indexInfo = { bIndex, lIndex };
  
  const lineItem = useRecoilValue(lineItemAtoms(indexInfo))
  const { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID, budgetID } = lineItem;

  let url = `http://localhost:3000/lineItems/${budgetID}/${lineItemID}`

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
      indexInfo={indexInfo}
      setEditing={setEditing}
      editing={editing}
    />
  )}
}

export default LineItem