import React, { useContext, useState } from 'react';
import { LineItemType, LineItemArray } from '../../types';
import LineItem from './LineItem'

type LineItemsProps = {
  lineItems: LineItemArray,
  budgetID: number
  bIndex: number
}

const LineItems: React.FC<LineItemsProps> = ({ lineItems, budgetID, bIndex }) => {


  return (
    <>
    {lineItems.map((item, i) => {
      return <LineItem
        key={`lineitem${item.lineItemID}${budgetID}`}
        lineItem={item}
        bIndex={bIndex}
        budgetID={budgetID}
        lIndex={i}
        />
    })}
    </>
  )
}

export default LineItems;