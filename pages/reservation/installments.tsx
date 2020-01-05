import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Page from '../../components/reservation/page'
import Footer from '../../components/reservation/footerSteps'
import { setInstallments } from '../../redux/actions/reservation'

export default () => {
  const dispatch = useDispatch()
  const label = useSelector((state) => state.reservation.reservationLabel)
  const installments = useSelector((state) => state.reservation.installments)
  const [spinnerValue, setSpinnerValue] = useState(installments || 1)


  const goNext = () => {
    console.log('Go next')
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

  return (
    <Page back="/reservation/hold_days" label={label} title="How many installments do you want to offer?">
      <div className="flex-cols">
        <div className="flex mt-16">
          <div className="text-5xl font-bold border-4 rounded-full h-16 w-16 flex items-center mx-8" onClick={() => decrease()}>
            <span className="m-auto">-</span>
          </div>
          <div className="text-5xl font-bold">{spinnerValue}</div>
          <div className="text-5xl font-bold border-4 rounded-full h-16 w-16 flex items-center mx-8" onClick={() => increse()}>
            <span>+</span>
          </div>
        </div>

      </div>
      <Footer callFunction={goNext} />
    </Page>
  )
}
