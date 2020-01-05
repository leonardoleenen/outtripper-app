import React, { useState } from 'react'

interface Props {
  callBackFunction: any
  value: number
}

export default (props:Props) => {
  const { callBackFunction, value } = props
  const [spinnerValue, setSpinnerValue] = useState(value)


  const increse = () => {
    const finalValue = value + 1

    setSpinnerValue(finalValue)
    callBackFunction(finalValue)
  }

  const decrease = () => {
    const finalValue = value - 1
    setSpinnerValue(finalValue)
    callBackFunction(finalValue)
  }

  return (
    <div className="flex mt-16 items-center m-auto">
      <div className="text-5xl font-bold border-4 rounded-full h-16 w-16 flex items-center mx-8" onClick={() => decrease()}>
        <span className="m-auto">-</span>
      </div>
      <div className="text-5xl font-bold">{spinnerValue}</div>
      <div className="text-5xl font-bold border-4 rounded-full h-16 w-16 flex items-center mx-8" onClick={() => increse()}>
        <span>+</span>
      </div>
    </div>
  )
}
