import React, { useState } from 'react'
import { LineItemActions, Methods } from './Actions';
import axios from 'axios';
import { InputEvent, FormEvent, DataObjects, LineItemType } from '../../types';
import { useRecoilValue, useRecoilState, SetterOrUpdater } from 'recoil';
import { lineItemAtoms } from './Store';
import { numFilter, curryChange, curryFetch } from './utils';

type LineItemEditingProps = {
  indexInfo: { bIndex: number, lIndex: number }
  editing: boolean,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  lineItem: LineItemType,
  setLineItem: SetterOrUpdater<LineItemType>,
  urlConfig: any
}


const LineItemEditing: React.FC<LineItemEditingProps> = ({ urlConfig, setEditing, indexInfo, lineItem, setLineItem }) => {
  const { description, category, expAmount, actAmount, isFixed, isRecurring, budgetID, lineItemID } = lineItem;


  const [ editedObject, setEditedObject ] = useState<DataObjects>({})
  

  const thenHandler = (res: any) => {
    setLineItem(prev => Object.assign({}, prev, editedObject));
    setEditedObject({});
    setEditing(false);
  }
      
  const catchHandler = (err: Error) => console.log(err);

  const handleSubmit = urlConfig(Methods.patch)(editedObject)(thenHandler)(catchHandler);

  const curryConfig = curryChange(editedObject)(setEditedObject);
    
  return (
    <div className='line-item'>
    <form onSubmit={handleSubmit}>
      <input value={(editedObject.description !== undefined)
        ? editedObject.description
        : description}
        onChange={curryConfig(LineItemActions.description)}></input>
      <input value={(editedObject.category !== undefined)
        ? editedObject.category
        : category}
        onChange={curryConfig(LineItemActions.category)}></input>
      <input value={(editedObject.expAmount !== undefined)
        ? editedObject.expAmount
        : expAmount.toLocaleString()}
        onChange={curryConfig(LineItemActions.expAmount)}></input>
      <input value={(editedObject.actAmount !== undefined)
        ? editedObject.actAmount
        : actAmount.toLocaleString()}
        onChange={curryConfig(LineItemActions.actAmount)}></input>
      <input type='checkbox'
        checked={(editedObject.isFixed !== undefined)
        ? editedObject.isFixed
        : isFixed}
        onChange={curryConfig(LineItemActions.isFixed)}></input>
      <input type='checkbox'
        checked={(editedObject.isRecurring !== undefined)
        ? editedObject.isRecurring
        : isRecurring}
        onChange={curryConfig(LineItemActions.isRecurring)}></input>
      <button type='submit'>Submit</button>
    </form>
    </div>
  )
}

export default LineItemEditing