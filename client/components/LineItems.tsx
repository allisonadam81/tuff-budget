import React, { useContext, useState } from 'react';
import { LineItem } from '../../types';
import { CrudContext } from './CrudContext';

type LineItemProps = {
  lineItemObject: LineItem,
  budgetID: number
  liIndex: number
  bIndex: number
}

const LineItems: React.FC<LineItemProps> = ({lineItemObject, budgetID, liIndex, bIndex }) => {

  const colorTheme = { default: 'green', editing: 'green', processing: 'grey' }

  const { description, category, expAmount, actAmount, isFixed, isRecurring, lineItemID } = lineItemObject;

  const { myCrudCall } = useContext(CrudContext);
  const [ editing, setEditing ] = useState(false);
  const [ theme, setTheme ] = useState(colorTheme.default);
  // convert non-spent actual amounts to zero
  let actToDisplay = actAmount;
  if (actToDisplay === -1) actToDisplay = 0;
// on click of text, we want to be able to switch the render to a form with an input instead of divs. Then on submit, leave the form as grey until the database updates.
// on click set editing to true. Turn render into forms. On submit, send the entire form to the crud call, change editing to false to render divs with theme grey. Once the crud call goes through, change to green and update accordingly.
  return (
    // if editing is false, return this
    <div className='line-item'>
      <div>{description}</div>
      <div>{category}</div>
      <div>{'$'.concat(expAmount.toLocaleString())}</div>
      <div>{'$'.concat(actToDisplay.toLocaleString())}</div>
      <div>{isFixed ? '✔️' : '✖️' }</div>
      <div>{isRecurring ? '✔️' : '✖️' }</div>
      <div className='delete-button'><button onClick={(e: any) => myCrudCall(e, { bIndex, liIndex }, 'DELETE', budgetID, lineItemID)}>X</button></div>
    </div>
    // if editing is true, return this
  )
}

export default LineItems;