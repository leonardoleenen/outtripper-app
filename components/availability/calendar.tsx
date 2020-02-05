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
  // programs: Array<Program>
  monthsAvailable: Array<number>
}


export default (props:Props) => {
  const { year, value, monthsAvailable } = props
  const dispatch = useDispatch()
  const router = useRouter()


  const setColor = (day: any, month: number) : string => {
    if (!day) {
      if (monthsAvailable.filter((v) => v === (month)).length === 0) {
        return 'gray-300'
      } return 'red-400'
    }

    // console.log(day.availability.map((m) => m).reduce((t, v) => t))

    // if (monthsAvailable.filter((v) => v === (new Date(day.availability[0].from).getMonth() + 1)).length === 0) return 'gray-300'

    // eslint-disable-next-line no-return-assign
    const qty : number = day.availability.map((m) => m.freeSpots).reduce((t : number, v : number) => t += v)

    if (qty === 12) { return 'green-300' }


    return 'yellow-300'
  }


  return (
    <div className="overflow-auto bg-gray-100">
      <div className="flex  m-2 justify-center">
        <div className="w-full max-w-md grid">
          {value.map((m: { month: number; year: number; days: any[] }, idxMonth: { toString: () => any }) => (
            <div
              className="bg-white p-2"
              style={{ boxShadow: '1px 1px 7px rgba(216, 216, 216, 0.5)', borderRadius: '9px' }}
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
              <div className="ml-4 my-4 text-black font-semibold">{moment(new Date(year, m.month, 0)).format('MMMM')}</div>
              <div className="gridDays">


                {Array(moment(`${year}-${m.month}`, 'YYYY-MM-DD').day() !== 0 ? moment(`${year}-${m.month}`, 'YYYY-MM-DD').day() : 0).fill('').map((empty, idxEmpty) => (<div key={m.month.toString() + idxEmpty.toString()} className="h-auto w-auto">{empty}</div>))}
                {m.days.map((d: any, idxDays: number) => (<div key={(idxDays + 100).toString() + uuid4()} className={`bg-${setColor(d, m.month)} h-5 w-5`} />))}
              </div>
            </div>
          ))}
        </div>
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
