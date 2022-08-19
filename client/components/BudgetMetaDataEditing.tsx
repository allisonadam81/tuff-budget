import React, { useState, useContext } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';
import { userAtom, budgetAtoms } from './Store';
import { FormEvent, InputEvent, Budget, DataObjects } from '../../types';
import { curryFetch, urlFunc, curryChange } from './utils';
import { BudgetProps, LineItemActions, Methods } from './Actions';

type BudgetMetaDataEditingProps = {
  urlConfig: any,
  bIndex: number,
  setEditing: any,
}

const BudgetMetaDataEditing: React.FC<BudgetMetaDataEditingProps> = ({ urlConfig, bIndex, setEditing }) => {
  const userID = useRecoilValue(userAtom);
  
  const [ budgetObject, setBudgetObject ] = useRecoilState<any>(budgetAtoms(bIndex));
  const { title, budget, budgetID } = budgetObject; // do not need line items right now.


  const [ editedObject, setEditedObject ] = useState<DataObjects>({});
  
  const thenHandler = (res: any) => {
    setBudgetObject({ type: Methods.patch, payload: editedObject})
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