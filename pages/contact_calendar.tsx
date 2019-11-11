import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
// import { useSelector } from 'react-redux'
import Link from 'next/link'
import { StoreData } from '../redux/store'
import businessService from '../services/business'

export default () => {
  const router = useRouter()
  const { goBackTo } = router.query
  const bs = businessService

  // const user = useSelector((state: StoreData) => state.loggedUser.user)

  useEffect(() => {
    const fetchContacts = async () => {

    }
  }, [])

  return (
    <div>
      <div>Lista </div>
      <Link href="/new_contact">
        <div> New</div>
      </Link>
    </div>
  )
}
