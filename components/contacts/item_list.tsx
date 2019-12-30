import React from 'react'

interface Props {
  key: string
  cn: string
  email: string
  avatar: string
  subText?: string
}

export default (props: Props) => {
  const {
    cn, email, subText, key,
  } = props

  return (
    <div key={key} className="flex ml-4 h-16 mt-4 items-center">
      <div className="h-16 w-16 rounded-full bg-teal-600 flex items-center">
        <span className="text-white m-auto text-2xl font-bold">{cn.trim().split(' ').map((a) => a[0].toUpperCase()).join('')}</span>
      </div>
      <div className="ml-4">
        <div className="text-2xl text-gray-700 h-8">{cn}</div>
        <div className="text-sm text-gray-500 h-6">{email}</div>
        <div className="text-xs text-teal-600 font-semibold h-6">{subText}</div>
      </div>
    </div>
  )
}
