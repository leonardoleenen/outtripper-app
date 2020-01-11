/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import moment from 'moment'
import _ from 'underscore'

import bs from '../services/business'
import Loading from '../components/loading'
import { setAvailableDate } from '../redux/actions/reservation'

export default () => {
  const program : Program = useSelector((state) => state.reservation.programSelected)
  const monthAndYear : MonthAndYear = useSelector((state) => state.reservation.monthAndYearSelected)
  const dateSelected : AvailableDate = useSelector((state) => state.reservation.availableDate)
  const guestQuantity : number = useSelector((state) => state.reservation.guestQuantity)
  const [availability, setAvailability] = useState<Array<AvailableDate>>()
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetch = async () => {
      const av = await bs.getAvailabilityByMonthAndYear(program.id, monthAndYear.month - 1, monthAndYear.year)
      setAvailability(_.sortBy(av, (ad : AvailableDate) => ad.from))
    }
    fetch()
  }, [])

  const setColor = (date: AvailableDate) : string => {
    if (date.freeSpots === date.totalSpots) { return 'green-300' }

    if (date.freeSpots >= (date.totalSpots / 1.30)) return 'yellow-300'

    return 'orange-200'
  }

  const isDifferentMonth = (prev: AvailableDate, curr:AvailableDate) : boolean => {
    const prevMonth = new Date(prev.from).getMonth()
    const curMonth = new Date(curr.from).getMonth()
    console.log(prevMonth, curMonth)
    return prevMonth === curMonth
  }


  if (!availability) return <Loading />

  return (
    <div className="relative h-screen">
      <header className="flex mt-4">
        <div onClick={() => router.push('/availability')}><IconArrowLeft /></div>
        <IconCalendar />
      </header>
      <div className="text-3xl font-semibold ml-4 mt-8">{`${program.name} availability`}</div>
      <article className="mt-8">
        {availability.map((a:AvailableDate, index: number) => (
          <div key={a.id} className="flex-cols " onClick={() => dispatch(setAvailableDate(a))}>
            {index === 0 ? <div className="w-full">{moment(a.from).format('MMMM YYYY')}</div> : isDifferentMonth(availability[index - 1], a) ? <div className="w-full">{moment(a.from).format('MMMM YYYY')}</div> : '' }

            <div className={`flex p-5 border-b  ${dateSelected && (dateSelected.id === a.id) ? 'bg-teal-100' : ''}`}>
              <div className="w-4/6 font-thin text-gray-700">
                {`${moment(a.from).format('ddd DD')} to ${moment(a.to).format('ddd DD')}`}
              </div>
              <div className="w-2/6 ">
                <div className="font-thin text-gray-700">
                  {` ${a.freeSpots} free / `}
                  <span className="text-xs text-gray-500">
                    {a.totalSpots}
                  </span>
                </div>
                <div className="font-thin text-xs text-indigo-700">$ todo</div>
              </div>
            </div>
          </div>
        )) }
      </article>

      {dateSelected ? (
        <div className="absolute inset-x-0 bottom-0 bg-gray-100 flex px-4 justify-center items-center mb-4">
          <div className="w-4/6 mt-4">
            <div className="font-semibold text-sm">{program.name}</div>
            <div className="font-thin text-sm">{`${moment(dateSelected.from).format('MMM D')} to ${moment(dateSelected.to).format('MMM D')}`}</div>
            <div className="font-thin text-sm">
              {`${guestQuantity || '1'} Guest - ${dateSelected.price}`}
            </div>
          </div>
          <div className="h-12 w-2/6 px-8 py-4 bg-teal-500 flex " onClick={() => router.push('/reservation/holder')}>
            <span className="uppercase text-white ">next</span>
          </div>
        </div>
      )
        : ''}
    </div>

  )
}

const IconCalendar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19 22C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19ZM9 13V11H7V13H9ZM5 8H19V6H5V8ZM19 10V20H5V10H19ZM17 13V11H15V13H17ZM13 13H11V11H13V13Z" fill="#718096" />
  </svg>

)

const IconArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.8287 18.9995C13.5367 18.9995 13.2467 18.8725 13.0487 18.6265L8.22066 12.6265C7.92266 12.2555 7.92666 11.7255 8.23166 11.3595L13.2317 5.3595C13.5847 4.9355 14.2157 4.8785 14.6407 5.2315C15.0647 5.5845 15.1217 6.2155 14.7677 6.6395L10.2927 12.0105L14.6077 17.3725C14.9537 17.8025 14.8857 18.4325 14.4547 18.7785C14.2707 18.9275 14.0487 18.9995 13.8287 18.9995Z" fill="#231F20" />
    <mask id="mask0L" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="5" width="7" height="14">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.8287 18.9995C13.5367 18.9995 13.2467 18.8725 13.0487 18.6265L8.22066 12.6265C7.92266 12.2555 7.92666 11.7255 8.23166 11.3595L13.2317 5.3595C13.5847 4.9355 14.2157 4.8785 14.6407 5.2315C15.0647 5.5845 15.1217 6.2155 14.7677 6.6395L10.2927 12.0105L14.6077 17.3725C14.9537 17.8025 14.8857 18.4325 14.4547 18.7785C14.2707 18.9275 14.0487 18.9995 13.8287 18.9995Z" fill="white" />
    </mask>
    <g mask="url(#mask0L)">
      <rect width="24" height="24" fill="#0D1C2E" />
    </g>
  </svg>

)
