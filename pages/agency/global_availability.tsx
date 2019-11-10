import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import businessServive from '../../services/business'

export default () => {
  const router = useRouter()
  const { destinationId } = router.query
  const bs = businessServive

  useEffect(() => {
    const fetchPrograms = async () => {
      await bs.getPrograms(null)
    }

    fetchPrograms()
  }, [])

  return <div> Global Availability</div>
}
