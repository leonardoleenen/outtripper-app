/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react'
import * as _ from 'underscore'
import lunr from 'lunr'
import { IconBack, IconSearch } from '../statics/icons'
import '../statics/style/style.scss'
import ItemList from '../components/contacts/item_list'


import bs from '../services/business'

let contactIndex = null
let contactFiltered = []

export default () => {
  const [contacts, setContacts] = useState<Array<Contact>>([])
  const [textToSearch, setTextToSearch] = useState('')

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


  if (contactIndex) {
    contactFiltered = contacts.filter((c:Contact) => contactIndex.search(`*${textToSearch}*`).filter((cf) => cf.ref.trim() === c.id.trim()).length > 0)
    // console.log(contactFiltered.search(`*${textToSearch}*`).filter((cf) => cf.ref.trim() === contacts))
  }

  // contactFiltered ? contactFiltered.search(`*${textToSearch}*`).map((cf) => cf.ref === 'leonado@flicktrip.com') : 'Nada')
  return (
    <div className="flex-cols">
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
        <div key={c.email}>
          {index === 0 || contactFiltered[index - 1].lastName.substring(0, 1).toUpperCase() !== c.lastName.substring(0, 1).toUpperCase() ? <div className="h-8 ml-4 text-2xl font-bold mt-4">{c.lastName.substring(0, 1).toUpperCase()}</div> : ''}
          <ItemList cn={`${c.lastName} ${c.firstName}`} subText="5 trips" avatar={null} key={c.id} email={c.email} />
        </div>
      ))}
    </div>
  )
}
