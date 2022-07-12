import React, { useContext, useState, useReducer } from 'react'
import { LineItemActions } from './Actions';
import axios from 'axios';
import { InputEvent, FormEvent } from '../../types';
import { useRecoilValue } from 'recoil';
import { lineItemAtoms } from './Store';
import { numFilter } from './curryFuncs'

type LineItemEditingProps = {
  indexInfo: { bIndex: number, lIndex: number }
  editing: boolean,
  setEditing: any
}


const LineItemEditing: React.FC<LineItemEditingProps> = ({ setEditing, indexInfo }) => {

  const lineItem = useRecoilValue(lineItemAtoms(indexInfo));

  const { description, category, expAmount, actAmount, isFixed, isRecurring, budgetID, lineItemID } = lineItem;

  let url = `http://localhost:3000/lineItems/${budgetID}/${lineItemID}`

  const [ editedObject, setEditedObject ]: any = useState({})

  const handleChange = (e: InputEvent, type: string) => {
      if (type === LineItemActions.description || type === LineItemActions.category){
        return setEditedObject({ ...editedObject, [type]: e.target.value })
      }
      if (type === LineItemActions.expAmount || type === LineItemActions.actAmount){
        return setEditedObject({ ...editedObject, [type]: numFilter(e.target.value) })
      }
      if (type === LineItemActions.isFixed || type === LineItemActions.isRecurring){
        return setEditedObject({ ...editedObject, [type]: e.target.checked })
      }
    }
  
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
        onChange={(e: InputEvent) => handleChange(e, LineItemActions.description)}></input>
      <input value={(editedObject.category !== undefined)
        ? editedObject.category
        : category}
        onChange={(e: InputEvent) => handleChange(e, LineItemActions.category)}></input>
      <input value={(editedObject.expAmount !== undefined)
        ? editedObject.expAmount
        : expAmount.toLocaleString()}
        onChange={(e: InputEvent) => handleChange(e, LineItemActions.expAmount)}></input>
      <input value={(editedObject.actAmount !== undefined)
        ? editedObject.actAmount
        : actAmount.toLocaleString()}
        onChange={(e: InputEvent) => handleChange(e, LineItemActions.actAmount)}></input>
      <input type='checkbox'
        checked={(editedObject.isFixed !== undefined)
        ? editedObject.isFixed
        : isFixed}
        onChange={(e: InputEvent) => handleChange(e, LineItemActions.isFixed)}></input>
      <input type='checkbox'
        checked={(editedObject.isRecurring !== undefined)
        ? editedObject.isRecurring
        : isRecurring}
        onChange={(e: InputEvent) => handleChange(e, LineItemActions.isRecurring)}></input>
      <button type='submit'>Submit</button>
    </form>
    </div>
  )
}

export default LineItemEditing