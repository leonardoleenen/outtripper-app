import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setCallingPage } from '../../redux/actions/contact_calendar'
import { StoreData } from '../../redux/store'
import { setReservationHolder, setAvailableDate } from '../../redux/actions/reservation'
import bs from '../../services/business'
import Loading from '../../components/loading'

export default () => {
  const router = useRouter()
  // const [isLoading, setLoading] = useState(true)
  const [dateAvailable, setDateAvailable] = useState<AvailableDate>(null)

  const dispatch = useDispatch()
  const { id } = router.query
  const reservationHolder : Contact = useSelector((state: StoreData) => state.contactCalendar.contactSelected)

  useEffect(() => {
    const fetchDate = async () => {
      const l = await bs.getAvailableDate(id as string, bs.getLoggedUser().token.organizationId)
      setDateAvailable(l)
      dispatch(setAvailableDate(l))
    }

    fetchDate()
  }, [])

  console.log(dateAvailable)
  const goToContactCalendar = () => {
    dispatch(setCallingPage('/reservation_process/reservation_holder'))
    router.push('/contact_calendar')
  }

  const goTo = (url: string) => {
    router.push(url)
  }

  if (reservationHolder) { dispatch(setReservationHolder(reservationHolder)) }
  if (!dateAvailable) return <Loading />

  return (
    <div className="h-screen relative">
      <header>Header</header>
      <div onClick={() => goToContactCalendar()}>Reservation Holder</div>
      {reservationHolder ? <div>{reservationHolder.firstName}</div> : '' }
      <footer className="flex absolute inset-x-0 bottom-0 my-8 mx-2 w-full">
        <div className="flex w-1/3">
          <div>
            <ArrowLeft />
          </div>
          <div onClick={() => goTo('/reservation_process/guest_qty')}>NEXT</div>
        </div>
        <div className="w-1/3">  </div>
        <div className="flex w-1/3">
          <div className="flex justify-end" onClick={() => goTo('/')}>BACK</div>
          <div><ArrowRight /></div>
        </div>
      </footer>
    </div>
  )
}

const ArrowRight = () => (
  <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M8.6 7.4L10 6L16 12L10 18L8.6 16.6L13.2 12L8.6 7.4Z" fill="black" />
  </svg>
)

const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M15.4 7.4L14 6L8 12L14 18L15.4 16.6L10.8 12L15.4 7.4Z" fill="black" />
  </svg>
)
