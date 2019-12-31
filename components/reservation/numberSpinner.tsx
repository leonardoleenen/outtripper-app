import React, { useState } from 'react'

interface Props {
  callBackFunction: any
}

export default (props:Props) => {
  const [value, setValue] = useState(1)
  const { callBackFunction } = props

  const increse = () => {
    const finalValue = value + 1

    setValue(finalValue)
    callBackFunction(finalValue)
  }

  const decrease = () => {
    const finalValue = value - 1
    setValue(finalValue)
    callBackFunction(finalValue)
  }

  return (
    <div className="flex mt-16 items-center m-auto">
      <div className="text-5xl font-bold border-4 rounded-full h-16 w-16 flex items-center mx-8" onClick={() => decrease()}>
        <span className="m-auto">-</span>
      </div>
      <div className="text-5xl font-bold">{value}</div>
      <div className="text-5xl font-bold border-4 rounded-full h-16 w-16 flex items-center mx-8" onClick={() => increse()}>
        <span>+</span>
      </div>
    </div>
  )
}
