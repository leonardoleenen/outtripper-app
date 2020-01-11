import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Page from '../../components/reservation/page'
import Footer from '../../components/reservation/footerSteps'
import { setInstallments } from '../../redux/actions/reservation'
import bs from '../../services/business'
import Loading from '../../components/loading'


export default () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const label = useSelector((state) => state.reservation.reservationLabel)
  const daysInHold : number = useSelector((state) => state.reservation.daysInHold)
  const holder : Contact = useSelector((state) => state.reservation.reservationHolder)
  const date: AvailableDate = useSelector((state) => state.reservation.availableDate)
  const guests : number = useSelector((state) => state.reservation.guestQuantity)
  const installments = useSelector((state) => state.reservation.installments)
  const [spinnerValue, setSpinnerValue] = useState(installments || 1)
  const [waitForCreation, setWaitForCreation] = useState(false)

  const paxes = Array(guests).fill(null)
  paxes[0] = holder

  const goNext = () => {
    setWaitForCreation(true)
    bs.createReservation(holder, daysInHold, paxes, label, date, installments).then((reservation : Reservation) => {
      router.push(`/reservation/voucher?id=${reservation.id}`)
    })
  }

  const increse = () => {
    const finalValue = spinnerValue + 1

    setSpinnerValue(finalValue)
    dispatch(setInstallments(finalValue))
    // callBackFunction(finalValue)
  }

  const decrease = () => {
    const finalValue = spinnerValue - 1
    setSpinnerValue(finalValue)
    dispatch(setInstallments(finalValue))
    // callBackFunction(finalValue)
  }

  if (waitForCreation) return <Loading />
  return (
    <Page back="/reservation/hold_days" label={label} title="How many installments do you want to offer?">
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
      </div>
      <Footer callFunction={goNext} />
    </Page>
  )
}
