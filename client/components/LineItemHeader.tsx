import React from 'react';


type LineItemHeaderProps = {}

const LineItemHeader = (props: LineItemHeaderProps) => {
  
  return (
    <div className='line-item-header'>
      <div><b>Description:</b></div>
      <div><b>Category:</b></div>
      <div><b>Expected Amount:</b></div>
      <div><b>Actual Spent:</b></div>
      <div><b>Is Fixed?</b></div>
      <div><b>Is Recurring?</b></div>
    </div>
  )
}

export default LineItemHeader