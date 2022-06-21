import React, { useContext, useState } from 'react';
import { LineItemType, LineItemArray } from '../../types';
import LineItem from './LineItem'

type LineItemProps = {
  lineItems: LineItemArray,
  budgetID: number
  bIndex: number
}

const LineItems: React.FC<LineItemProps> = ({ lineItems, budgetID, bIndex }) => {
// on click of text, we want to be able to switch the render to a form with an input instead of divs. Then on submit, leave the form as grey until the database updates.
// on click set editing to true. Turn render into forms. On submit, send the entire form to the crud call, change editing to false to render divs with theme grey. Once the crud call goes through, change to green and update accordingly.
  const lineItemsArray = new Array(lineItems.length);
  lineItems.forEach((item: LineItemType, i: Number) => {
    lineItemsArray[item.lIndex] = <LineItem
    key={item.lineItemID}
    lineItem={item}
    bIndex={bIndex}
    budgetID={budgetID}
    />
  })
  return (
    <>
    {lineItemsArray}
    </>
  )
}

export default LineItems;