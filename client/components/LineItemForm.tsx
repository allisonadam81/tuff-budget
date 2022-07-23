import React, { useContext, useState, useEffect } from 'react';
import { changeHandler, numHandler, checkHandler, urlFunc, curryFetch, curryChange } from './curryFuncs';
import { LineItemArray, LineItemType, InputEvent, FormEvent } from '../../types';
// import LineItems from './LineItems';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { budgetPropertySelectors, budgetAtoms } from './Store';
import { Methods, LineItemActions, BudgetProps } from './Actions';

const initialForm = {
  description: '',
  category: '',
  expAmount: 0,
  actAmount: 0,
  isFixed: false,
  isRecurring: false
}

type LineItemFormProps = {
  bIndex: number,
}

const LineItemForm: React.FC<LineItemFormProps> = ({ bIndex }) => {
  const lineItemID = 0;
  const [ budget, setBudget ] = useRecoilState(budgetAtoms(bIndex));

  const { budgetID } = budget;
  
  const url = urlFunc('lineItems', budgetID, lineItemID);
  const [ newLineItem, setNewLineItem ] = useState(initialForm);
  const { description, category, expAmount, actAmount, isFixed, isRecurring } = newLineItem;
  
  
  const thenHandler = (res: any) => {
    // set recoil state here;
    setNewLineItem(initialForm)
  }
  const catchHandler = (err: Error) => {
    console.log(err);
  }

  const handleSubmit = curryFetch(url)(Methods.post)(newLineItem)(thenHandler)(catchHandler)
    
  const curryConfig = curryChange(newLineItem)(setNewLineItem);


  return (
    <div className='add-line-item-form'>
      <form onSubmit = {handleSubmit}>
        <input placeholder='description' value={description}
          onChange={curryConfig(LineItemActions.description)}></input>
        <input placeholder='category' value={category}
          onChange={curryConfig(LineItemActions.category)}></input>
        <input placeholder='expected amount' value={expAmount ? expAmount.toString() : ''}
          onChange={curryConfig(LineItemActions.expAmount)}></input>
        <input placeholder='actual amount' value={actAmount ? actAmount.toString() : ''}
          onChange={curryConfig(LineItemActions.actAmount)}></input>
        {/* add check boxes for recocurring and fixed */}
        Fixed?: <input type='checkbox' name='Fixed' checked={isFixed}
          onChange={curryConfig(LineItemActions.isFixed)}></input>
        Recurring?: <input type='checkbox' name='Recurring' checked={isRecurring}
          onChange={curryConfig(LineItemActions.isRecurring)}></input>
        <button>Submit</button>
      </form>
  </div>
  )
}

export default LineItemForm;