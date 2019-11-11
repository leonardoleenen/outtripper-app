import React from 'react'
import { useRouter } from 'next/router'
// import { useSelector } from 'react-redux'
import Link from 'next/link'
import { StoreData } from '../redux/store'


export default () => {
  const router = useRouter()
  const { goBackTo } = router.query
  // const user = useSelector((state: StoreData) => state.loggedUser.user)

  const goBack = () => router.push(goBackTo as string)

  return (
    <div>
      <div>Lista </div>
      <Link href="/new_contact">
        <div> New</div>
      </Link>
    </div>
  )
}
