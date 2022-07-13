// import React, { useContext, useState } from 'react';
// import { LineItemType, LineItemArray } from '../../types';
// import { useRecoilValue } from 'recoil';
// import LineItem from './LineItem'
// import { budgetAtomFamily } from './Store';

// type LineItemsProps = {
//   bIndex: number
//   budgetID: number
// }

// const LineItems: React.FC<LineItemsProps> = ({ budgetID, bIndex }) => {
//   const lineItems = useRecoilValue(budgetAtomFamily(bIndex)).lineItems;
//   return (
//     <>
//     {lineItems.map((item: LineItemType, i: number) => {
//       return <LineItem
//         key={`lineitem${item.lineItemID}${budgetID}`}
//         bIndex={bIndex}
//         lIndex={i}
//         />
//     })}
//     </>
//   )
// }

// export default LineItems;