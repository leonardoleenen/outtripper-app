import React from 'react'

interface Props {
  closeFunction : Function
}

export default (props: Props) => {
  const { closeFunction } = props

  return (
    <div className="bg-gray-100 p-4">
      <label htmlFor="lastName">
        <div className="mt-4">
          <span>Last Name</span>
          <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" name="lastName" type="text" />
        </div>
      </label>
      <label htmlFor="firstName">
        <div className="mt-4">
          <span>First Name</span>
          <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" name="firstName" type="text" />
        </div>
      </label>

      <label htmlFor="email">
        <div className="mt-4">
          <span>Email</span>
          <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" name="email" type="text" />
        </div>
      </label>

      <label htmlFor="state">
        <span>State</span>
        <div className="inline-block relative  mt-4">

          <select name="state" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>Really long option that will likely overlap the chevron</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
      </label>

      <div className="flex w-full justify-center mt-4">
        <button onClick={() => closeFunction()} type="button" className="px-8 py-4 border text-white font-semibold uppercase rounded-lg bg-teal-700"> Save</button>
      </div>
    </div>
  )
}
