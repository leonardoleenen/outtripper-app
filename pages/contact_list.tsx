/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react'
import * as _ from 'underscore'
import lunr from 'lunr'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setContact } from '../redux/actions/contact_calendar'
import Loading from '../components/loading'
import { IconBack, IconSearch } from '../statics/icons'
import ItemList from '../components/contacts/item_list'
import NotificationBell from '../components/notification_bell'

import bs from '../services/business'

let contactIndex = null
let contactFiltered = []

export default () => {
  const [contacts, setContacts] = useState<Array<Contact>>(null)
  const [textToSearch, setTextToSearch] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const goTo = useSelector((state) => state.contactCalendar.callingPage)

  useEffect(() => {
    const fetchContacts = async () => {
      const contactList = _.sortBy(await bs.getContacts(), (c:Contact) => c.lastName)
      contactIndex = lunr(function () {
        this.ref('id')
        this.field('rawText')
        contactList.forEach((c: Contact) => {
          // eslint-disable-next-line no-param-reassign
          c.rawText = `${c.firstName} ${c.lastName} ${c.email}`
          this.add(c)
        })
      })
      setContacts(contactList)
    }

    fetchContacts()
  }, [])

  if (!contacts) return <Loading />


  if (contactIndex) {
    contactFiltered = contacts.filter((c:Contact) => contactIndex.search(`*${textToSearch}*`).filter((cf) => cf.ref.trim() === c.id.trim()).length > 0)
  }

  return (
    <div className="flex-cols relative">
      <header className="flex mt-8  items-center">
        <div className="h-8 w-8 mx-4 flex items-center"><IconBack /></div>
        <h1 className="font-semibold text-xl m-auto w-2/3">Contacts</h1>
        <div className="h-8 w-8 flex items-center"><NotificationBell /></div>
        <div className="h-8 w-8 flex items-center" onClick={() => router.push('/new_contact')}><IconAdd /></div>
      </header>
      <div className="flex ml-4 mt-4 h-8 mr-4 ">
        <div className=" bg-gray-200 flex items-center pl-4 rounded-l "><IconSearch /></div>
        <input
          value={textToSearch}
          onChange={(e) => setTextToSearch(e.target.value)}
          className=" bg-gray-200 w-full pl-4 rounded-r text-gray-800 focus:outline-none"
          placeholder="Search"
        />
      </div>

      <div className="bg-gray-200">
        {contactFiltered.map((c: Contact, index:number) => (
          <div
            key={c.id}
            onClick={() => {
              dispatch(setContact(c))
              router.push(goTo)
            }}
          >
            {index === 0 || contactFiltered[index - 1].lastName.substring(0, 1).toUpperCase() !== c.lastName.substring(0, 1).toUpperCase() ? <div className="h-8 ml-4 text-2xl font-bold mt-4">{c.lastName.substring(0, 1).toUpperCase()}</div> : ''}
            <ItemList cn={`${c.lastName} ${c.firstName}`} subText="5 trips" avatar={null} key={c.id} email={c.email} />
          </div>
        ))}
      </div>


    </div>
  )
}

const IconAdd = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.36035 14.9668C7.68555 14.9668 7.95801 14.7031 7.95801 14.3779V8.26953H13.8906C14.207 8.26953 14.4795 7.99707 14.4795 7.67188C14.4795 7.34668 14.207 7.07422 13.8906 7.07422H7.95801V0.957031C7.95801 0.631836 7.68555 0.368164 7.36035 0.368164C7.03516 0.368164 6.7627 0.631836 6.7627 0.957031V7.07422H0.838867C0.513672 7.07422 0.241211 7.34668 0.241211 7.67188C0.241211 7.99707 0.513672 8.26953 0.838867 8.26953H6.7627V14.3779C6.7627 14.7031 7.03516 14.9668 7.36035 14.9668Z" fill="#1A202C" />
  </svg>
)
