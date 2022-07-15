import React, { useContext, useState, useReducer } from 'react'
import { LineItemActions } from './Actions';
import axios from 'axios';
import { InputEvent, FormEvent } from '../../types';
import { useRecoilValue } from 'recoil';
import { lineItemAtoms } from './Store';
import { numFilter, curryChange } from './curryFuncs';

type LineItemEditingProps = {
  indexInfo: { bIndex: number, lIndex: number }
  editing: boolean,
  setEditing: any,
  url: string
}


const LineItemEditing: React.FC<LineItemEditingProps> = ({ url, setEditing, indexInfo }) => {

  const lineItem = useRecoilValue(lineItemAtoms(indexInfo));

  const { description, category, expAmount, actAmount, isFixed, isRecurring, budgetID, lineItemID } = lineItem;

  const [ editedObject, setEditedObject ]: any = useState({})
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!Object.keys(editedObject).length){
        return setEditing(false);
      }
      axios.patch(url, editedObject)
        .then(data => {
          const { lineItem } = data.data;
        })
        .catch(err => console.log(err));
      setEditedObject({})
      setEditing(false);
      return;
    }

    
  return (
    <div className='line-item'>
    <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
      <input value={(editedObject.description !== undefined)
        ? editedObject.description
        : description}
        onChange={curryChange(editedObject, LineItemActions.description)(setEditedObject)}></input>
      <input value={(editedObject.category !== undefined)
        ? editedObject.category
        : category}
        onChange={curryChange(editedObject, LineItemActions.category)(setEditedObject)}></input>
      <input value={(editedObject.expAmount !== undefined)
        ? editedObject.expAmount
        : expAmount.toLocaleString()}
        onChange={curryChange(editedObject, LineItemActions.expAmount)(setEditedObject)}></input>
      <input value={(editedObject.actAmount !== undefined)
        ? editedObject.actAmount
        : actAmount.toLocaleString()}
        onChange={curryChange(editedObject, LineItemActions.actAmount)(setEditedObject)}></input>
      <input type='checkbox'
        checked={(editedObject.isFixed !== undefined)
        ? editedObject.isFixed
        : isFixed}
        onChange={curryChange(editedObject, LineItemActions.isFixed)(setEditedObject)}></input>
      <input type='checkbox'
        checked={(editedObject.isRecurring !== undefined)
        ? editedObject.isRecurring
        : isRecurring}
        onChange={curryChange(editedObject, LineItemActions.isRecurring)(setEditedObject)}></input>
      <button type='submit'>Submit</button>
    </form>
    </div>
  )
}

export default LineItemEditing