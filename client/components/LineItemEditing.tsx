import React, { useContext, useState, useReducer } from 'react'
import { CrudContext } from './CrudContext'

type LineItemEditingProps = {
  description: string,
  category: string,
  expAmount: number,
  actAmount: number,
  isFixed: boolean,
  isRecurring: boolean,
  budgetID: number,
  lineItemID: number
  liIndex: number,
  bIndex: number
}

const LineItemEditing = (props: LineItemEditingProps) => {
  const { description, category, expAmount, actAmount, isFixed, isRecurring, budgetID, lineItemID, liIndex, bIndex } = props;
  const { myCrudCall } = useContext(CrudContext);


  

  return (
    <form>
      <input value={description}></input>
      <input>{category}</input>
      <input>{'$'.concat(expAmount.toLocaleString())}</input>
      <input>{'$'.concat(actAmount.toLocaleString())}</input>
      <input>{isFixed ? '✔️' : '✖️' }</input>
      <input>{isRecurring ? '✔️' : '✖️' }</input>
      <div className='delete-button'><button onClick={(e: any) => myCrudCall(e, 'DELETE', budgetID, lineItemID)}>X</button></div>
    </form>
  )
}

export default LineItemEditing