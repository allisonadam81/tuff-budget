import React, { useState, useContext } from 'react';
import { useRecoilValue, useRecoilState, SetterOrUpdater } from 'recoil';
import axios from 'axios';
import { userAtom, budgetAtoms } from './Store';
import { FormEvent, InputEvent, Budget, DataObjects } from '../../types';
import { curryFetch, urlFunc, curryChange } from './utils';
import { BudgetProps, LineItemActions, Methods } from './Actions';

type BudgetMetaDataEditingProps = {
  urlConfig: any,
  bIndex: number,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  budgetObject: Budget,
  setBudgetObject: SetterOrUpdater<Budget>
}

const BudgetMetaDataEditing: React.FC<BudgetMetaDataEditingProps> = ({ urlConfig, bIndex, setEditing, budgetObject, setBudgetObject }) => {
  const userID = useRecoilValue(userAtom);
  
  const { title, budget, budgetID } = budgetObject; // do not need line items right now.


  const [ editedObject, setEditedObject ] = useState<DataObjects>({});
  
  const thenHandler = (res: any) => {
    setBudgetObject(prev => Object.assign({}, prev, editedObject))
    setEditedObject({})
    setEditing(false);
  }

  const catchHandler = (err: Error) => {
    console.log(err);
  }
  
  const handleSubmit = urlConfig(Methods.patch)(editedObject)(thenHandler)(catchHandler)

  const curryConfig = curryChange(editedObject)(setEditedObject);

  return (
    <div className='budget-meta-data'>
      <form onSubmit={handleSubmit}>
        <input value={(editedObject.title !== undefined)
          ? editedObject.title
          : title}
          onChange={curryConfig(LineItemActions.title)}>
        </input>
        <input value={(editedObject.budget !== undefined)
          ? editedObject.budget
          : budget.toLocaleString()}
          onChange={curryConfig(LineItemActions.budget)}>
        </input>
        <button type='submit' >Submit</button>
      </form>
  </div>
  )
}

export default BudgetMetaDataEditing