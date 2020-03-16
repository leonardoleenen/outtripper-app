import React from 'react'

interface Props {
  children: any
  key?: any
}
export default (props: Props) => {
  const { children, key } = props
  return (
    <div key={key} className="mt-4 p-4 bg-gray-900 rounded-lg text-gray-400 font-thin">{children}</div>
  )
}
