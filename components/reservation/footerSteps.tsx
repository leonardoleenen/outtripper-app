import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

interface Props {
  callFunction : any
}

export default (props: Props) => {
  const { callFunction } = props
  const program : Program = useSelector((state) => state.reservation.programSelected)
  const dateSelected : AvailableDate = useSelector((state) => state.reservation.availableDate)
  const guestQuantity : number = useSelector((state) => state.reservation.guestQuantity) || 1

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })

  return (
    <div className="absolute inset-x-0 bottom-0 h-24 bg-white flex items-center">
      <div className="text-gray-800 w-2/3 mx-4">
        <div className="font-semibold text-black text-lg">{program.name}</div>
        <div className="font-base text-gray-700 text-sm">{`${moment(dateSelected.from).format('MMM D')} to ${moment(dateSelected.to).format('MMM D')}`}</div>
        <div className="flex justify-start items-center">
          <IconPeople />
          <span className="w-11/12 ml-4 text-xs">{`${guestQuantity} Guest - ${formatter.format(dateSelected.price * guestQuantity)}`}</span>
        </div>
      </div>
      <div className="bg-teal-600 p-4 h-12 rounded uppercase text-white font-thin text-sm flex items-center w-1/3 mr-4" onClick={callFunction}>
        <span>Next</span>
      </div>
    </div>
  )
}

const IconPeople = () => (
  <svg className="h-6 w-6" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.49992 2.83203C6.9345 2.83203 5.66659 4.09995 5.66659 5.66536C5.66659 7.23078 6.9345 8.4987 8.49992 8.4987C10.0653 8.4987 11.3333 7.23078 11.3333 5.66536C11.3333 4.09995 10.0653 2.83203 8.49992 2.83203ZM9.91658 5.66536C9.91658 4.8862 9.27908 4.2487 8.49992 4.2487C7.72075 4.2487 7.08325 4.8862 7.08325 5.66536C7.08325 6.44453 7.72075 7.08203 8.49992 7.08203C9.27908 7.08203 9.91658 6.44453 9.91658 5.66536ZM12.7499 12.0404C12.6083 11.5374 10.4124 10.6237 8.49992 10.6237C6.58742 10.6237 4.39159 11.5374 4.24992 12.0474V12.7487H12.7499V12.0404ZM2.83325 12.0404C2.83325 10.1562 6.60867 9.20703 8.49992 9.20703C10.3912 9.20703 14.1666 10.1562 14.1666 12.0404V14.1654H2.83325V12.0404Z" fill="#718096" />
  </svg>
)
