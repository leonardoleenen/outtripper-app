import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Page from '../../components/reservation/page'
import Footer from '../../components/reservation/footerSteps'
import NumberSpinner from '../../components/reservation/numberSpinner'
import { setGuestQuantity } from '../../redux/actions/reservation'

export default () => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const router = useRouter()
  const label = useSelector((state) => state.reservation.reservationLabel)
  const setQuantity = () => {
    dispatch(setGuestQuantity(value))
    router.push('/reservation/hold_days')
  }

  return (
    <Page back="/reservation/label" label={label} title="How many guest will be at the group?">
      <div className="flex-cols">
        <div className="flex mt-16"><NumberSpinner callBackFunction={setValue} /></div>
        <div className="flex mt-20"><span className="m-auto font-semibold text-4xl">3</span></div>
        <div className="flex"><span className="m-auto font-thin">Spots left to book for this trip</span></div>
      </div>
      <Footer callFunction={setQuantity} />
    </Page>
  )
}
