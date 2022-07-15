import React, { useState, useContext } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';
import { userAtom, budgetAtoms } from './Store';
import { FormEvent, InputEvent, Budget } from '../../types';

type BudgetMetaDataEditingProps = {
  url: string,
  bIndex: number,
  setEditing: any
}

const budgetActions = {
  title: 'title',
  budget: 'budget'
}

const BudgetMetaDataEditing: React.FC<BudgetMetaDataEditingProps> = ({ url, bIndex, setEditing }) => {
  const userID = useRecoilValue(userAtom);
  const [ budgetObject, setBudgetObject ] = useRecoilState(budgetAtoms(bIndex));
  const { title, budget, budgetID } = budgetObject; // do not need line items right now.


  const [ editedObject, setEditedObject ]: any = useState({});

  const handleChange = (e: any, type: string) => {
    let { value } = e.target;
    if (type === budgetActions.title){
      return setEditedObject({ ...editedObject, [type]: value })
    }
    if (type = budgetActions.budget){
      return setEditedObject({ ...editedObject, [type]: Number(value.replace(/\D/g, '')) })
    }
  }

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  if (!Object.keys(editedObject).length){
    return setEditing(false);
  }

  axios.patch(url, editedObject)
  .then(data => {
    const { budget } = data.data;
  })
  .catch(err => console.log(err));
  setEditedObject({})
  setEditing(false);
  return;
}

/*
  const handleSubmit = curryFetch(editedobject)(url)(Methods.patch)(
    (res: any) => {
      
    }
  )
*/
  
  return (
    <div className='budget-meta-data'>
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <input value={(editedObject.title !== undefined)
          ? editedObject.title
          : title}
          onChange={(e: InputEvent) => handleChange(e, budgetActions.title)}>
        </input>
        <input value={(editedObject.budget !== undefined)
          ? editedObject.budget
          : budget.toLocaleString()}
          onChange={(e: InputEvent) => handleChange(e, budgetActions.budget)}>
        </input>
        <button type='submit' >Submit</button>
      </form>
  </div>
  )
}

export default BudgetMetaDataEditing