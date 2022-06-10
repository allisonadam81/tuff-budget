import React from 'react'

type ActualTotalProps = {
  budget: number,
  actualTotal: number
}

const SpentData = ({ budget, actualTotal }: ActualTotalProps) => {
  
  return (
    <div className='total-row'>
      <p><strong>Actual:</strong></p>
      <p>Current: {'$'.concat(actualTotal.toLocaleString())}</p>
      <p>Remaining: {'$'.concat((budget - actualTotal).toLocaleString())}</p>
    </div>
  )
}

export default SpentData