/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react'
import * as _ from 'underscore'
import lunr from 'lunr'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setContact } from '../redux/actions/contact_calendar'
import Loading from '../components/loading'
import { IconBack, IconSearch } from '../statics/icons'
import '../statics/style/style.css'
import ItemList from '../components/contacts/item_list'


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
      <div className="flex mt-8  items-center">
        <div className="h-8 w-8 mx-4"><IconBack /></div>
        <h1 className="font-bold text-2xl m-auto w-2/3">Contacts</h1>
      </div>
      <div className="flex ml-4 mt-4 h-8">
        <div className=" bg-gray-200 flex items-center pl-4 rounded-l "><IconSearch /></div>
        <input
          value={textToSearch}
          onChange={(e) => setTextToSearch(e.target.value)}
          className=" bg-gray-200 w-2/3 pl-4 rounded-r text-gray-800 focus:outline-none"
          placeholder="Search"
        />
      </div>

      {contactFiltered.map((c: Contact, index:number) => (
        <div
          key={c.email}
          onClick={() => {
            dispatch(setContact(c))
            router.push(goTo)
          }}
        >
          {index === 0 || contactFiltered[index - 1].lastName.substring(0, 1).toUpperCase() !== c.lastName.substring(0, 1).toUpperCase() ? <div className="h-8 ml-4 text-2xl font-bold mt-4">{c.lastName.substring(0, 1).toUpperCase()}</div> : ''}
          <ItemList cn={`${c.lastName} ${c.firstName}`} subText="5 trips" avatar={null} key={c.id} email={c.email} />
        </div>
      ))}


      <div className="buttonAdd absolute h-16 w-16 bg-teal-500 shadow-2xl right-0 bottom-0 rounded-full mb-8 mr-8 flex items-center" onClick={() => router.push('/new_contact')}>
        <IconAdd />
      </div>
      <style>
        {
          `
          .buttonAdd {
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14);
          }
          `
        }
      </style>
    </div>
  )
}

const IconAdd = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z" fill="white" />
  </svg>

)
