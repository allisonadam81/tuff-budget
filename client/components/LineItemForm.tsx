import React, { useContext, useState, useEffect } from 'react';
import { CrudContext } from './CrudContext';

type LineItemFormProps = {
  budgetID: number,
  bIndex: number
}

const newLineItemActions = {
  description: 'description',
  category: 'category',
  expAmount: 'expAmount',
  actAmount: 'actAmount',
  fixed: 'fixed',
  recurring: 'recurring'
}

const LineItemForm = (props: LineItemFormProps) => {
  const { bIndex, budgetID } = props;

  const { myCrudCall } = useContext(CrudContext);

  const initialFormState = {
    description: '',
    category: '',
    expAmount: 0,
    actAmount: 0,
    fixed: false,
    recurring: false
  }

  const [ newLineForm, setNewLineForm ] = useState(initialFormState)
// set up a reducer or a switch to handle all of the typing.

  const handleChange = (e: any, type: any) => {
    const { value, checked } = e.target;
      if (type === newLineItemActions.description || type === newLineItemActions.category){
        return setNewLineForm({ ...newLineForm, [type]: value })
      }
      if (type === newLineItemActions.expAmount || type === newLineItemActions.actAmount){
        return setNewLineForm({ ...newLineForm, [type]: Number(value) })
      }
      if (type === newLineItemActions.fixed || type === newLineItemActions.recurring){
        return setNewLineForm({ ...newLineForm, [type]: checked })
      }
    }

  return (
    <div className='add-line-item-form'>
      <form onSubmit = {(e) => {
        const newLineData = { newLineForm, bIndex }
        console.log(newLineData);
        myCrudCall(e, newLineData, 'POST', budgetID, 0);
        setNewLineForm(initialFormState);
        return;
      }
      }>
        <input placeholder='description' onChange={(e: any) => handleChange(e, newLineItemActions.description)}></input>
        <input placeholder='category' onChange={(e: any) => handleChange(e, newLineItemActions.category)}></input>
        <input placeholder='expected amount' type='number' onChange={(e: any) => handleChange(e, newLineItemActions.expAmount)}></input>
        <input placeholder='actual amount' type='number' onChange={(e: any) => handleChange(e, newLineItemActions.actAmount)}></input>
        {/* add check boxes for recocurring and fixed */}
        Fixed?: <input type='checkbox' name='Fixed' onChange={(e: any) => handleChange(e, newLineItemActions.fixed)}></input>
        Recurring?: <input type='checkbox' name='Recurring' onChange={(e: any) => handleChange(e, newLineItemActions.recurring)}></input>
        <button>Submit</button>
      </form>
  </div>
  )
}

export default LineItemForm;