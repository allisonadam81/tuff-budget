import React from 'react'

type ExpectedDataProps = {
  expectedTotal: number,
  budget: number
}

const ExpectedData = ({ expectedTotal, budget }: ExpectedDataProps) => {
  

  return (
    <div className='total-row'>
      <p><strong>Expected:</strong></p>
      <p>Current: {'$'.concat(expectedTotal.toLocaleString())}</p>
      <p>Remaining: {'$'.concat((budget - expectedTotal).toLocaleString())}</p>
    </div>
  )
}

export default ExpectedData