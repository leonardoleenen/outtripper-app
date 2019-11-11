import React from 'react'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()

  const goTo = (url: string) => {
    router.push(url)
  }

  return (
    <div>
      <div>Reservation Qty</div>
      <div onClick={() => goTo('/reservation_process/reservation_label')}>Next</div>
      <div onClick={() => goTo('/reservation_process/reservation_holder')}>Back</div>
    </div>
  )
}
