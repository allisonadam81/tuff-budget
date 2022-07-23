import React, { useContext, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { lineItemAtoms } from './Store';
import { LineItemType, ButtonEvent, InputEvent, OnClickEvent } from '../../types';
import { urlFunc, curryFetch } from './curryFuncs';
import LineItemEditing from './LineItemEditing';
import { Methods } from './Actions';

type LineItemProps = {
  bIndex: number,
  lIndex: number,
}

const LineItem: React.FC<LineItemProps> = ({ bIndex, lIndex }) => {
  const indexInfo = { bIndex, lIndex };
  
  const lineItem = useRecoilValue(lineItemAtoms(indexInfo))
  const { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID, budgetID } = lineItem;

  const url = urlFunc('lineItems', budgetID, lineItemID);

  const colorTheme = {
    default: 'green',
    editing: 'green',
    processing: 'grey'
  };


  const [ editing, setEditing ] = useState(false);
  const [ theme, setTheme ] = useState(colorTheme.default);

const thenHandler = (res: any) => {
// set state
}

const catchHandler = (err: Error) => console.log(err);

const urlConfig = curryFetch(url);

const handleClick = urlConfig(Methods.delete)(null)(thenHandler)(catchHandler)


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
      <button onClick={handleClick}>X</button>
    </div>
  </div>

  )} else {
    return (
    <LineItemEditing
      urlConfig={urlConfig}
      indexInfo={indexInfo}
      setEditing={setEditing}
      editing={editing}
    />
  )}
}

export default LineItem