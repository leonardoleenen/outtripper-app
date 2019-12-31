import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Page from '../../components/reservation/page'
import Footer from '../../components/reservation/footerSteps'
import NumberSpinner from '../../components/reservation/numberSpinner'
import { setInstallments } from '../../redux/actions/reservation'

export default () => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const label = useSelector((state) => state.reservation.reservationLabel)

  const setQuantity = () => {
    dispatch(setInstallments(value))
    // console.log(value)
  }

  return (
    <Page back="/reservation/hold_days" label={label} title="How many installments do you want to offer?">
      <div className="flex-cols">
        <div className="flex mt-16"><NumberSpinner callBackFunction={setValue} /></div>

      </div>
      <Footer callFunction={setQuantity} />
    </Page>
  )
}
