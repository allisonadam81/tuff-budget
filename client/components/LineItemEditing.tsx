import React, { useContext, useState, useReducer } from 'react'
import { CrudContext } from './CrudContext'
import { LineItemActions } from './Actions';
import { Methods } from './Actions'

type LineItemEditingProps = {
  description: string,
  category: string,
  expAmount: number | string,
  actAmount: number | string,
  isFixed: boolean,
  isRecurring: boolean,
  budgetID: number,
  lineItemID: number
  lIndex: number,
  bIndex: number,
  editing: boolean,
  setEditing: any
}

const LineItemEditing = (props: LineItemEditingProps) => {
  const { description, category, expAmount, actAmount, isFixed, isRecurring, budgetID, lineItemID, lIndex, bIndex, setEditing } = props;
  const { myCrudCall } = useContext(CrudContext);

  const [ editedObject, setEditedObject ]: any = useState({ bIndex, lIndex })

  const handleChange = (e: any, type: string) => {
    const { value, checked } = e.target;

      if (type === LineItemActions.description || type === LineItemActions.category){
        return setEditedObject({ ...editedObject, [type]: value })
      }
      if (type === LineItemActions.expAmount || type === LineItemActions.actAmount){
        return setEditedObject({ ...editedObject, [type]: Number(value) })
      }
      if (type === LineItemActions.isFixed || type === LineItemActions.isRecurring){
        console.log('here')
        return setEditedObject({ ...editedObject, [type]: checked })
      }
    }
  

  return (
    <form className='line-item' onSubmit={(e:any) => {
      e.preventDefault();
      myCrudCall(e, editedObject, Methods.patch, budgetID, lineItemID);
      setEditedObject({ bIndex, lIndex })
      setEditing(false);
      return;
    }
    }>
      <input value={(editedObject.description !== undefined)
        ? editedObject.description
        : description}
        onChange={(e: any) => handleChange(e, LineItemActions.description)}></input>
      <input value={(editedObject.category !== undefined)
        ? editedObject.category
        : category}
        onChange={(e: any) => handleChange(e, LineItemActions.category)}></input>
      <input type='number'
      value={(editedObject.expAmount !== undefined)
        ? editedObject.expAmount
        : Number(expAmount)}
        onChange={(e: any) => handleChange(e, LineItemActions.expAmount)}></input>
      <input type='number'
      value={(editedObject.actAmount !== undefined)
      ? editedObject.actAmount
      : Number(actAmount)} onChange={(e: any) => handleChange(e, LineItemActions.actAmount)}></input>
      <input type='checkbox'
      checked={(editedObject.isFixed !== undefined)
      ? editedObject.isFixed
      : isFixed}
      onChange={(e: any) => handleChange(e, LineItemActions.isFixed)}></input>
      <input type='checkbox'
      checked={(editedObject.isRecurring !== undefined)
      ? editedObject.isRecurring
      : isRecurring}
      onChange={(e: any) => handleChange(e, LineItemActions.isRecurring)}></input>
      <button type='submit' >Submit</button>
    </form>
  )
}

export default LineItemEditing