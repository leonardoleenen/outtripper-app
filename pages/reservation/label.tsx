import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Page from '../../components/reservation/page'
import Footer from '../../components/reservation/footerSteps'
import { setReservationLabel } from '../../redux/actions/reservation'

export default () => {
  const dispatch = useDispatch()
  const [label, setLabel] = useState('')
  const router = useRouter()

  const next = () => {
    dispatch(setReservationLabel(label))
    router.push('/reservation/guest_qty')
  }

  return (
    <Page back="/reservation/holder" label={label} title="Give this reservation a label">
      <input
        onChange={(e) => setLabel(e.target.value)}
        value={label}
        className="text-white bg-transparenttext-white bg-transparent ml-4 mt-8 border p-4 rounded-lg w-10/12 focus:outline-none"
        placeholder="Write a reservation label please "
      />
      <Footer callFunction={next} />
    </Page>
  )
}
