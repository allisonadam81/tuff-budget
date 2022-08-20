import React from 'react';
import { useRecoilState } from 'recoil';
import { lineItemArrayAtoms } from './Store';
import LineItem from './LineItem';

import { LineItemType } from '../../types';

type LineItemContainerProps = {
  bIndex: number
}

const LineItemContainer: React.FC<LineItemContainerProps> = ({ bIndex }) => {

  const [ lineItemArray, setLineItemArray ] = useRecoilState(lineItemArrayAtoms(bIndex));

  return (
          <>
          {lineItemArray.map((el: LineItemType, i: number) => <LineItem
          key={`lineItem${el.lineItemID}`}
          lIndex={i}
          bIndex={bIndex}
          setLineItemArray={setLineItemArray}
          />
        )}
        </>
  )
}

export default LineItemContainer