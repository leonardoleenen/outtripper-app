import React from 'react'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()

  const goTo = (url: string) => {
    router.push(url)
  }

  return (
    <div>
      <div>Reservation Label</div>
      <div>Next</div>
      <div onClick={() => goTo('/reservation_process/guest_qty')}>Back</div>
    </div>
  )
}
