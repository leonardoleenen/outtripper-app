import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setCallingPage } from '../../redux/actions/contact_calendar'
import { StoreData } from '../../redux/store'
import { setReservationHolder } from '../../redux/actions/reservation'

export default () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const reservationHolder : Contact = useSelector((state: StoreData) => state.contactCalendar.contactSelected)

  const goToContactCalendar = () => {
    dispatch(setCallingPage('/reservation_process/reservation_holder'))
    router.push('/contact_calendar')
  }

  const goTo = (url: string) => {
    router.push(url)
  }

  if (reservationHolder) { dispatch(setReservationHolder(reservationHolder)) }

  console.log(reservationHolder)

  return (
    <div>
      <div onClick={() => goToContactCalendar()}>Reservation Holder</div>
      {reservationHolder ? <div>{reservationHolder.firstName}</div> : '' }
      <div onClick={() => goTo('/reservation_process/guest_qty')}>Next</div>
      <div onClick={() => goTo('/')}>Back</div>
    </div>
  )
}
