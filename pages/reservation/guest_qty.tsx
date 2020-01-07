import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Page from '../../components/reservation/page'
import Footer from '../../components/reservation/footerSteps'
import { setGuestQuantity } from '../../redux/actions/reservation'

export default () => {
  const guestQuantity : number = useSelector((state) => state.reservation.guestQuantity) || 1
  const dateSelected : AvailableDate = useSelector((state) => state.reservation.availableDate)
  const dispatch = useDispatch()
  const router = useRouter()
  const label = useSelector((state) => state.reservation.reservationLabel)
  const [spinnerValue, setSpinnerValue] = useState(guestQuantity || 1)


  const goNext = () => {
    router.push('/reservation/hold_days')
  }


  const increse = () => {
    const finalValue = dateSelected.freeSpots === spinnerValue ? spinnerValue : spinnerValue + 1

    setSpinnerValue(finalValue)
    dispatch(setGuestQuantity(finalValue))
    // callBackFunction(finalValue)
  }

  const decrease = () => {
    const finalValue = spinnerValue === 1 ? 1 : spinnerValue - 1
    setSpinnerValue(finalValue)
    dispatch(setGuestQuantity(finalValue))
    // callBackFunction(finalValue)
  }

  return (
    <Page back="/reservation/label" label={label} title="How many guest will be at the group?">
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
        <div className="flex mt-20"><span className="m-auto font-semibold text-4xl">{dateSelected.freeSpots - guestQuantity }</span></div>
        <div className="flex"><span className="m-auto font-thin">Spots left to book for this trip</span></div>
      </div>
      <Footer callFunction={goNext} />
    </Page>
  )
}
