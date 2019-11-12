import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'
import { StoreData } from '../redux/store'
import businessService from '../services/business'

export default () => {
  const bs = businessService
  const { user } = useSelector((state : StoreData) => state.loggedUser)
  const [contactList, setContactList] = useState([])

  useEffect(() => {
    const fetchContacts = async () => {
      setContactList(await bs.getContacts(user.organization))
    }

    fetchContacts()
  }, [])

  return (
    <div>
      <div>Lista </div>
      {contactList.map((c:Contact) => (
        <div key={c.id}>
          {c.firstName}
        </div>
      ))}
      <Link href="/new_contact">
        <div> New</div>
      </Link>
    </div>
  )
}
