import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { useRouter } from 'next/router'
import businessServive from '../../services/business'
import { StoreData } from '../../redux/store'
import { setAvailableDate } from '../../redux/actions/reservation'

export default () => {
  const bs = businessServive
  const destination : Destination = useSelector((state:StoreData) => state.core.destination)
  const [availableDates, setAvailableDates] = useState([])
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const fetchAvailableDates = async () => {
      setAvailableDates(await bs.getAllAvailableDate(destination))
    }

    fetchAvailableDates()
  }, [])

  const setDate = (date :AvailableDate) => {
    dispatch(setAvailableDate(date))
    router.push('/reservation_process/reservation_holder')
  }

  return (
    <ul>
      {availableDates.map((a:AvailableDate) => (
        <li key={a.id} onClick={() => setDate(a)}>
          {`Program: ${a.program.cn} dateFrom: ${a.dateFrom} dateTo: ${moment(a.dateTo * 1000).format('Do MMM YY')} price: ${a.price}` }
        </li>
      ))}
    </ul>
  )
}
