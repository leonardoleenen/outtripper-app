import React from 'react'

interface Props {
  children: any
}
export default (props: Props) => {
  const { children } = props
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg text-gray-400 font-thin">{children}</div>
  )
}
