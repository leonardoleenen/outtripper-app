/* eslint-disable no-param-reassign */
import React from 'react'
import uuid4 from 'uuid4'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setMonthAndYear } from '../../redux/actions/reservation'


interface Props {
  year: number,
  value: Array<any>
  defaultFunction : any
}


export default (props:Props) => {
  const { year, value } = props
  const dispatch = useDispatch()
  const router = useRouter()


  const setColor = (day: any) : string => {
    if (!day) { return 'red-700' }


    // eslint-disable-next-line no-return-assign
    const qty : number = day.availability.map((m) => m.freeSpots).reduce((t : number, v : number) => t += v)

    if (qty === 10) { return 'green-500' }


    if (qty >= 8) return 'yellow-400'
    return 'orange-500'
  }


  return (
    <div className="overflow-auto">
      <div className="flex w-40 h-40 grid m-2">
        {value.map((m: { month: number; year: number; days: any[] }, idxMonth: { toString: () => any }) => (
          <div
            key={idxMonth.toString() + uuid4()}
            onClick={() => {
              if (props.defaultFunction) {
                props.defaultFunction()
              } else {
                dispatch(setMonthAndYear({ month: m.month, year: m.year }))
                router.push('/available_dates')
              }
            }}
          >
            <div className="my-4 text-gray-700">{moment(new Date(year, m.month, 0)).format('MMMM')}</div>
            <div className="gridDays">


              {Array(moment(`${year}-${m.month}`, 'YYYY-MM-DD').day() !== 0 ? moment(`${year}-${m.month}`, 'YYYY-MM-DD').day() : 0).fill('').map((empty, idxEmpty) => (<div key={m.month.toString() + idxEmpty.toString()} className="h-5 w-5">{empty}</div>))}
              {m.days.map((d: any, idxDays: number) => (<div key={(idxDays + 100).toString() + uuid4()} className={`bg-${setColor(d)} h-5 w-5 rounded`} />))}
            </div>
          </div>
        ))}
      </div>


      <style>
        {
          `
            .grid {
              display: grid;
              grid-gap: 15px;
              grid-template-columns: 1fr 1fr;
            }

            .gridDays { 
              display: grid; 
              grid-gap: 5px; 
              grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr
            }
          `
          }
      </style>
    </div>
  )
}
