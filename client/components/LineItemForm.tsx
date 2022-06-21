import React, { useContext, useState, useEffect } from 'react';
import { CrudContext } from './CrudContext';
import { LineItemActions } from './Actions';
import { LineItemArray, LineItemType } from '../../types';
import LineItems from './LineItems';

type LineItemFormProps = {
  budgetID: number,
  bIndex: number,
  lineItems: LineItemArray
}

const LineItemForm = ({ bIndex, budgetID, lineItems }: LineItemFormProps) => {

  const { myCrudCall } =  useContext(CrudContext);

  const initialFormState = {
    description: '',
    category: '',
    expAmount: '',
    actAmount: '',
    isFixed: false,
    isRecurring: false,
    lIndex: lineItems.length
  }

  const [ newLineForm, setNewLineForm ] = useState(initialFormState)
// set up a reducer or a switch to handle all of the typing.

  const handleChange = (e: any, type: string) => {
    const { value, checked } = e.target;
      if (type === LineItemActions.description || type === LineItemActions.category){
        return setNewLineForm({ ...newLineForm, [type]: value })
      }
      if (type === LineItemActions.expAmount || type === LineItemActions.actAmount){
        return setNewLineForm({ ...newLineForm, [type]: Number(value.replace(/\D/g, '')) })
      }
      if (type === LineItemActions.isFixed || type === LineItemActions.isRecurring){
        return setNewLineForm({ ...newLineForm, [type]: checked })
      }
    }

  return (
    <div className='add-line-item-form'>
      <form onSubmit = {(e) => {
        const newLineData = { newLineForm, bIndex }
        myCrudCall(e, newLineData, 'POST', budgetID, 0);
        setNewLineForm(initialFormState);
        return;
      }
      }>
        <input placeholder='description' onChange={(e: any) => handleChange(e, LineItemActions.description)}></input>
        <input placeholder='category' onChange={(e: any) => handleChange(e, LineItemActions.category)}></input>
        <input placeholder='expected amount' value={newLineForm.expAmount} onChange={(e: any) => handleChange(e, LineItemActions.expAmount)}></input>
        <input placeholder='actual amount' value={newLineForm.actAmount} onChange={(e: any) => handleChange(e, LineItemActions.actAmount)}></input>
        {/* add check boxes for recocurring and fixed */}
        Fixed?: <input type='checkbox' name='Fixed' onChange={(e: any) => handleChange(e, LineItemActions.isFixed)}></input>
        Recurring?: <input type='checkbox' name='Recurring' onChange={(e: any) => handleChange(e, LineItemActions.isRecurring)}></input>
        <button>Submit</button>
      </form>
  </div>
  )
}

export default LineItemForm;