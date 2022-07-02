import React, { useContext, useState, useEffect } from 'react';
import { CrudContext } from './CrudContext';
import { LineItemArray, LineItemType, InputEvent, FormEvent } from '../../types';
import { budgetReducerActionTypes as types } from './BudgetReducer';
import LineItems from './LineItems';
import axios from 'axios';

type LineItemFormProps = {
  budgetID: number,
  bIndex: number,
  lineItems: LineItemArray
}

const LineItemForm: React.FC<LineItemFormProps> = ({ bIndex, budgetID, lineItems }) => {
  const lineItemID = 0;

  let url = `http://localhost:3000/lineItems/${budgetID}/${lineItemID}`;

  
  const { dispatch } =  useContext(CrudContext);

  
  const [ description, setDescription ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ expAmount, setExpAmount ] = useState<number | string>('');
  const [ actAmount, setActAmount ] = useState<number | string>('');
  const [ isFixed, setIsFixed ] = useState(false);
  const [ isRecurring, setIsRecurring ] = useState(false);

  const addLineItem = (e: FormEvent, newLineItem: any) => {
    e.preventDefault();
    if (!description || !category){
      console.log('passing blank state');
      return;
    }
      axios.post(url, newLineItem)
      .then((res: any) => {
        newLineItem.lineItemID = res.data.lineItemID;
        dispatch({type: types.createLineItem, payload: { newLineItem, budgetID, bIndex }})
        return;
      })
      .catch(err => console.log(err));
    }

  function resetState () {
    setDescription('');
    setCategory('');
    setExpAmount('');
    setActAmount('');
    setIsFixed(false);
    setIsRecurring(false);
  }

  // const handleChange = (e: InputEvent, type: string) => {
  //   let { value, checked } = e.target;
  //     if (type === LineItemActions.description || type === LineItemActions.category){
  //       return setEditedObject({ ...editedObject, [type]: value })
  //     }
  //     if (type === LineItemActions.expAmount || type === LineItemActions.actAmount){
  //       return setEditedObject({ ...editedObject, [type]: Number(value.replace(/\D/g, '')) })
  //     }
  //     if (type === LineItemActions.isFixed || type === LineItemActions.isRecurring){
  //       return setEditedObject({ ...editedObject, [type]: checked })
  //     }
  //   }

  return (
    <div className='add-line-item-form'>
      <form onSubmit = {(e: FormEvent) => {
        const newLineItem = { description, category, expAmount: Number(expAmount), actAmount: Number(actAmount), isFixed, isRecurring, lineItemID }
        addLineItem(e, newLineItem);
        resetState();
        return;
      }
      }>
        <input placeholder='description' value={description} onChange={(e: InputEvent) => setDescription(e.target.value)}></input>
        <input placeholder='category' value={category} onChange={(e: InputEvent) => setCategory(e.target.value)}></input>
        <input placeholder='expected amount' value={expAmount.toString()} onChange={(e: InputEvent) => setExpAmount(Number(e.target.value.replace(/\D/g, '')))}></input>
        <input placeholder='actual amount' value={actAmount.toString()} onChange={(e: InputEvent) => setActAmount(Number(e.target.value.replace(/\D/g, '')))}></input>
        {/* add check boxes for recocurring and fixed */}
        Fixed?: <input type='checkbox' name='Fixed' checked={isFixed} onChange={(e: InputEvent) => setIsFixed(e.target.checked)}></input>
        Recurring?: <input type='checkbox' name='Recurring' checked={isRecurring}onChange={(e: InputEvent) => setIsRecurring(e.target.checked)}></input>
        <button>Submit</button>
      </form>
  </div>
  )
}

export default LineItemForm;