import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useRouter } from 'next/router'
import Page from '../../components/reservation/page'
import Footer from '../../components/reservation/footerSteps'
import NumberSpinner from '../../components/reservation/numberSpinner'
import { setDaysInHold } from '../../redux/actions/reservation'

export default () => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const router = useRouter()
  const label = useSelector((state) => state.reservation.reservationLabel)


  const setQuantity = () => {
    dispatch(setDaysInHold(value))
    // console.log(value)
    router.push('/reservation/installments')
  }

  return (
    <Page back="/reservation/guest_qty" label={label} title="How many days to the hold goes on due?">
      <div className="flex-cols">
        <div className="flex mt-16"><NumberSpinner callBackFunction={setValue} /></div>
        <div className="flex mt-20"><span className="m-auto font-semibold text-2xl">{moment().add(value + 1, 'days').format('D MMM YYYY')}</span></div>
        <div className="flex"><span className="m-auto font-thin">Reservation due date</span></div>
      </div>
      <Footer callFunction={setQuantity} />
    </Page>
  )
}
