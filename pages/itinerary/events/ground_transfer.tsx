import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useRouter } from 'next/router'
import Card from '../../../components/itinerary/ground_transfer_card'
import Loading from '../../../components/loading'
import bs, { ITINERARY_EVENT } from '../../../services/business'


export default () => {
  const [from, setFrom] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [to, setTo] = useState('')
  const [days, setDays] = useState<number>(0)
  const router = useRouter()
  const reservation : Reservation = useSelector((state) => state.reservation.reservationSelected)
  const pax : Contact = useSelector((state) => state.contactCalendar.contactSelected)

  const createEvent = () => {
    setIsLoading(true)
    const event : ItineraryGroundTransfer = {
      from,
      to,
      kind: ITINERARY_EVENT.GROUNDTRANSFER,
    }
    bs.setItineraryGroundTransfer(reservation.id, pax, days, event).then(() => {
      router.push(`/reservation/voucher?id=${reservation.id}`)
    })
  }


  if (isLoading) return <Loading />

  return (
    <div>
      <header className="p-4">
        <span className="text-2xl font-semibold">Ground Transfer</span>
      </header>
      <div className="font-semibold ml-4">{moment(reservation.serviceFrom).add(days > 0 ? days + reservation.program.serviceDaysQuantity : days, 'days').format('LLL')}</div>
      <Card from={from} to={to} />
      <form className="p-4">
        <fieldset className="mt-4 text-teal-500">
          <legend className="uppercase font-semibold text-gray-600">Days before or after trip</legend>
          <div className="mt-4 ">
            <div className="flex font-bold text-4xl items-center justify-center">
              <div onClick={() => setDays(days - 1)} className="w-16 rounded-full border-4 border-teal-500 flex justify-center"><span>-</span></div>
              <div className="px-4"><span>{days}</span></div>
              <div onClick={() => setDays(days + 1)} className="w-16 rounded-full border-4 border-teal-500 flex justify-center"><span>+</span></div>
            </div>
          </div>
        </fieldset>
        <fieldset className="mt-8">
          <legend className="uppercase font-semibold text-gray-600">Pickup location</legend>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            type="texr"
            placeholder="Destination location"
          />
        </fieldset>

        <fieldset className="mt-4">
          <legend className="uppercase font-semibold text-gray-600">Destination</legend>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            type="texr"
            placeholder="Destination location"
          />
        </fieldset>
        <div className="p-8 flex items-center justify-center">
          <div className="px-16 py-4 font-bold text-teal-700 border border-teal-700" onClick={() => createEvent()}>
            SAVE
          </div>
        </div>

      </form>
    </div>
  )
}
