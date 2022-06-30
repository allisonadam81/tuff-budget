import React, { useContext, useState, useEffect } from 'react';
import { CrudContext } from './CrudContext';
import { LineItemArray, LineItemType } from '../../types';
import { budgetReducerActionTypes as types } from './BudgetReducer';
import LineItems from './LineItems';
import axios from 'axios';

type LineItemFormProps = {
  budgetID: number,
  bIndex: number,
  lineItems: LineItemArray
}

const LineItemForm = ({ bIndex, budgetID, lineItems }: LineItemFormProps) => {
  const lineItemID = 0;

  let url = `http://localhost:3000/lineItems/${budgetID}/${lineItemID}`;

  
  const { dispatch } =  useContext(CrudContext);

  
  const [ description, setDescription ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ expAmount, setExpAmount ] = useState('');
  const [ actAmount, setActAmount ] = useState('');
  const [ isFixed, setIsFixed ] = useState(false);
  const [ isRecurring, setIsRecurring ] = useState(false);

  const addLineItem = (e: any, newLineItem: LineItemType) => {
    e.preventDefault();
      axios.post(url, newLineItem)
      .then((res: any) => {
        newLineItem.lineItemID = res.data.lineItemID;
        dispatch({type: types.createLineItem, payload: { newLineItem, budgetID, bIndex }})
        return;
      })
      .catch(err => console.log(err));
    }

  const resetState = () => {
    setDescription('');
    setCategory('');
    setExpAmount('');
    setActAmount('');
    setIsFixed(false);
    setIsRecurring(false);
  }

  return (
    <div className='add-line-item-form'>
      <form onSubmit = {(e) => {
        const newLineItem = { description, category, expAmount: Number(expAmount), actAmount: Number(actAmount), isFixed, isRecurring, lineItemID }
        addLineItem(e, newLineItem);
        resetState();
        return;
      }
      }>
        <input placeholder='description' value={description} onChange={(e: any) => setDescription(e.target.value)}></input>
        <input placeholder='category' value={category} onChange={(e: any) => setCategory(e.target.value)}></input>
        <input placeholder='expected amount' value={expAmount} onChange={(e: any) => setExpAmount(e.target.value.replace(/\D/g, ''))}></input>
        <input placeholder='actual amount' value={actAmount} onChange={(e: any) => setActAmount(e.target.value.replace(/\D/g, ''))}></input>
        {/* add check boxes for recocurring and fixed */}
        Fixed?: <input type='checkbox' name='Fixed' checked={isFixed} onChange={(e: any) => setIsFixed(e.target.checked)}></input>
        Recurring?: <input type='checkbox' name='Recurring' checked={isRecurring}onChange={(e: any) => setIsRecurring(e.target.checked)}></input>
        <button>Submit</button>
      </form>
  </div>
  )
}

export default LineItemForm;