import React from 'react'

interface Props {
  function : any
}

export default (props: Props) => (
  <div className="flex justify-end">
    <div className="h-12 w-12 bg-teal-500 rounded-full flex items-center justify-center " onClick={() => props.function}>
      <span className="text-4xl font-semibold text-white "> + </span>

    </div>
  </div>

)
