import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useRouter } from 'next/router'
import Page from '../../components/reservation/page'
import Footer from '../../components/reservation/footerSteps'

import { setDaysInHold } from '../../redux/actions/reservation'

export default () => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const router = useRouter()
  const label = useSelector((state) => state.reservation.reservationLabel)
  const daysInHold = useSelector((state) => state.reservation.daysInHold)
  const [spinnerValue, setSpinnerValue] = useState(daysInHold || 1)

  const guestQuantity : number = useSelector((state) => state.reservation.guestQuantity) || 1
  const dateSelected : AvailableDate = useSelector((state) => state.reservation.availableDate)
  const program : Program = useSelector((state) => state.reservation.programSelected)


  const goNext = () => {
    router.push('/reservation/installments')
  }


  const increse = () => {
    const finalValue = spinnerValue + 1

    setSpinnerValue(finalValue)
    dispatch(setDaysInHold(finalValue))
    // callBackFunction(finalValue)
  }

  const decrease = () => {
    const finalValue = spinnerValue - 1
    setSpinnerValue(finalValue)
    dispatch(setDaysInHold(finalValue))
    // callBackFunction(finalValue)
  }

  if (!guestQuantity || !dateSelected || !program) {
    router.push('/error500')
    return <div>Empty</div>
  }

  return (
    <Page back="/reservation/guest_qty" label={label} title="How many days to the hold goes on due?">
      <div className="flex-cols">
        <div className="flex mt-16">
          <div className="flex mt-16 items-center m-auto">
            <div className=" border-4 rounded-full h-16 w-16 flex justify-center items-center mx-8" onClick={() => decrease()}>
              <span className="text-5xl font-bold">-</span>
            </div>
            <div className="text-5xl font-bold">{spinnerValue}</div>
            <div className=" border-4 rounded-full h-16 w-16 flex items-center justify-center mx-8" onClick={() => increse()}>
              <span className="text-5xl font-bold">+</span>
            </div>
          </div>
        </div>
        <div className="flex mt-20"><span className="m-auto font-semibold text-2xl">{moment().add(value + daysInHold, 'days').format('MMM, Do')}</span></div>
        <div className="flex"><span className="m-auto font-thin">Reservation due date</span></div>
      </div>
      <Footer callFunction={goNext} guestQuantity={guestQuantity} program={program} dateSelected={dateSelected} />
    </Page>
  )
}
