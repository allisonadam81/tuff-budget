import React, { useContext, useState, useEffect } from 'react';
import { changeHandler, numHandler, checkHandler } from './curryFuncs';
import { LineItemArray, LineItemType, InputEvent, FormEvent } from '../../types';
import { budgetReducerActionTypes as types } from './BudgetReducer';
// import LineItems from './LineItems';
import axios from 'axios';
import { budgetProps } from './BudgetProps';
import { useRecoilValue } from 'recoil';
import { budgetPropertySelectors } from './Store';

type LineItemFormProps = {
  bIndex: number,
}

const LineItemForm: React.FC<LineItemFormProps> = ({ bIndex }) => {
  const lineItemID = 0;
  
  const budgetID = useRecoilValue(budgetPropertySelectors({ bIndex, property: budgetProps.budgetID }))

  let url = `http://localhost:3000/lineItems/${budgetID}/${lineItemID}`;

  const [ description, setDescription ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ expAmount, setExpAmount ] = useState<number | string>('');
  const [ actAmount, setActAmount ] = useState<number | string>('');
  const [ isFixed, setIsFixed ] = useState(false);
  const [ isRecurring, setIsRecurring ] = useState(false);

  const addLineItem = (e: FormEvent, newLineItem: any) => {
    e.preventDefault();
    if (!description || !category || !expAmount){
      console.log('passing blank state');
      return;
    }
      axios.post(url, newLineItem)
      .then((res: any) => {
        newLineItem.lineItemID = res.data.lineItemID;
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

  return (
    <div className='add-line-item-form'>
      <form onSubmit = {(e: FormEvent) => {
        const newLineItem = { description, category, expAmount: Number(expAmount), actAmount: Number(actAmount), isFixed, isRecurring, lineItemID }
        addLineItem(e, newLineItem);
        resetState();
        return;
      }
      }>
        <input placeholder='description' value={description} onChange={changeHandler(setDescription)}></input>
        <input placeholder='category' value={category} onChange={changeHandler(setCategory)}></input>
        <input placeholder='expected amount' value={expAmount.toString()} onChange={numHandler(setExpAmount)}></input>
        <input placeholder='actual amount' value={actAmount.toString()} onChange={numHandler(setActAmount)}></input>
        {/* add check boxes for recocurring and fixed */}
        Fixed?: <input type='checkbox' name='Fixed' checked={isFixed} onChange={checkHandler(setIsFixed)}></input>
        Recurring?: <input type='checkbox' name='Recurring' checked={isRecurring} onChange={checkHandler(setIsRecurring)}></input>
        <button>Submit</button>
      </form>
  </div>
  )
}

export default LineItemForm;