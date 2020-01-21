import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Loading from '../../../components/loading'
import bs from '../../../services/business'
import '../../../statics/style/customer.css'
import Page from './page'
import moment from 'moment'

enum ACTIVE_TAB {
  CONTACT = 'CONTACT',
  PAYMENTS = 'PAYMENTS',
  MEMBERS = 'MEMBERS',
  ITINERARY = 'ITINERARY',
  PRETRIP = 'PRETRIP',
  CHECKLIST = 'CHECKLIST'
}

export default () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [reservation, setReservation] = useState<Reservation>(null)
  const [activeTab, setActiveTab] = useState(ACTIVE_TAB.PRETRIP)
  const { accessToken } = router.query
  const [organization, setOrganization] = useState<Organization>(null)

  const getContactInfoIcon = (kind: string) => {
    switch (kind) {
      case 'EMAIL':
        return <IconEmail />
      default:
        return <IconPhone />
    }
  }

  const Contact = () => (
    <div className="p-4">
      <div className="text-2xl font-bold py-4">Do you have a inquiry?</div>
      {organization.contactInfo.map((c: OrganizationContactInfo, index: number) => (
        <div key={`org${index.toString()}`} className="flex">
          <div className="py-2 w-8 flex items-center">{getContactInfoIcon(c.kind)}</div>
          <div className="py-2 ml-4 font-thin">{c.text}</div>
        </div>
      ))}

      <div className="text-2xl font-bold py-4 mt-8">Or chat with Us</div>
      <div className="mt-4">
        <div className="rounded-full flex justify-center"><img className="h-20 w-20 rounded-full shadow" src={organization.chatbotAvatar} alt="chatbot" /></div>

        <div className="flex justify-center font-semibold text-lg"><span>{organization.chatbotUserName}</span></div>
        <div className="flex justify-center font-thin text-sm mb-8"><span>{organization.chatbotUserTitle}</span></div>

      </div>

    </div>
  )

  const Payments = () => (
    <div>Payments</div>
  )

  const Members = () => (
    <div>Members</div>
  )

  const Itinerary = () => (
    <div>Itinerary</div>
  )

  const PreTrip = () => (
    <div className="p-4">
      <div className="text-2xl font-bold py-4">What you need to know before your trip</div>
      <div>
        <div className="text-xl font-semibold mt-4">Whats included?</div>
        {reservation.program.serviceCoverage.included.map((text: string, index: number) => (
          <div key={`prog${index.toString()}`} className="flex items-center">
            <div><IconIncluded /></div>
            <div className="ml-4 py-2 font-thin text-sm">{text}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-xl font-semibold mt-4">Whats not included?</div>
        {reservation.program.serviceCoverage.notIncluded.map((text: string, index: number) => (
          <div key={`prog${index.toString()}`} className="flex items-center">
            <div><IconNotIncluded /></div>
            <div className="ml-4 py-2 font-thin text-sm">{text}</div>
          </div>
        ))}
      </div>
      {reservation.program.preTripInfo.map((info:ProgramContentText, index: number) => (
        <div key={`info${index.toString()}`}>
          <div className="text-xl font-semibold mt-4">{info.title}</div>
          <div className="text-sm font-thin mt-2 text-justify antialiased">{info.text}</div>
        </div>
      ))}
    </div>
  )

  const CheckList = () => (
    <div>CheckList</div>
  )

  const renderActiveTab = () => {
    switch (activeTab) {
      case ACTIVE_TAB.CONTACT:
        return <Contact />
      case ACTIVE_TAB.PAYMENTS:
        return <Payments />
      case ACTIVE_TAB.MEMBERS:
        return <Members />
      case ACTIVE_TAB.ITINERARY:
        return <Itinerary />
      case ACTIVE_TAB.PRETRIP:
        return <PreTrip />
      case ACTIVE_TAB.CHECKLIST:
        return <CheckList />
      default:
        return <Contact />
    }
  }

  useEffect(() => {
    if (!accessToken) {
      router.push('/consumer/404')
    }

    const fetch = async () => {
      const reservationToken = await bs.getReservationAccessToken(accessToken as string)
      await bs.createConsumerToken(reservationToken)
      const r = await bs.getReservation(reservationToken.reservationId)
      setOrganization(await bs.getOrganization())
      setReservation(r)
      setIsLoading(false)
    }
    fetch()
  }, [])

  if (isLoading) return <Loading />


  const IconContact = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.83333 4.375H10.9375C11.7396 4.375 12.3958 5.03125 12.3958 5.83333C12.3958 7.65625 12.6875 9.40625 13.2271 11.0396C13.3875 11.55 13.2708 12.1188 12.8625 12.5271L9.65417 15.7354C11.7542 19.8625 15.1375 23.2313 19.2646 25.3458L22.4729 22.1375C22.7646 21.8604 23.1292 21.7146 23.5083 21.7146C23.6542 21.7146 23.8146 21.7292 23.9604 21.7875C25.5938 22.3271 27.3583 22.6188 29.1667 22.6188C29.9688 22.6188 30.625 23.275 30.625 24.0771V29.1667C30.625 29.9688 29.9688 30.625 29.1667 30.625C15.4729 30.625 4.375 19.5271 4.375 5.83333C4.375 5.03125 5.03125 4.375 5.83333 4.375ZM9.53751 7.29167C9.62501 8.58958 9.84376 9.85833 10.1938 11.0687L8.44376 12.8188C7.84585 11.0687 7.46668 9.21667 7.33543 7.29167H9.53751ZM23.9167 24.8208C25.1563 25.1708 26.425 25.3896 27.7083 25.4771V27.65C25.7833 27.5188 23.9313 27.1396 22.1667 26.5563L23.9167 24.8208Z" fill={activeTab === ACTIVE_TAB.CONTACT ? '#4299e1' : 'white'} />
    </svg>
  )

  const IconIncluded = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.32917 13.2291L3.85417 9.75414L2.67084 10.9291L7.32917 15.5875L17.3292 5.58748L16.1542 4.41248L7.32917 13.2291Z" fill="#04A590" />
    </svg>
  )

  const IconNotIncluded = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8333 5.34169L14.6583 4.16669L9.99999 8.82502L5.34166 4.16669L4.16666 5.34169L8.82499 10L4.16666 14.6584L5.34166 15.8334L9.99999 11.175L14.6583 15.8334L15.8333 14.6584L11.175 10L15.8333 5.34169Z" fill="black" fillOpacity="0.54" />
    </svg>
  )

  const IconCreditCard = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M29.167 5.83301H5.83366C4.21491 5.83301 2.93158 7.13092 2.93158 8.74967L2.91699 26.2497C2.91699 27.8684 4.21491 29.1663 5.83366 29.1663H29.167C30.7857 29.1663 32.0837 27.8684 32.0837 26.2497V8.74967C32.0837 7.13092 30.7857 5.83301 29.167 5.83301ZM29.167 26.2497H5.83366V17.4997H29.167V26.2497ZM5.83366 11.6663H29.167V8.74967H5.83366V11.6663Z" fill={activeTab === ACTIVE_TAB.PAYMENTS ? '#4299e1' : 'white'} />
    </svg>

  )

  const IconMember = () => (
    <svg width="35" height="35" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15C7.98857 15 0 17.0057 0 21V24H24V21C24 17.0057 16.0114 15 12 15Z" fill={activeTab === ACTIVE_TAB.MEMBERS ? '#4299e1' : 'white'} />
      <path d="M12 12C15.3086 12 18 9.30857 18 6C18 2.69143 15.3086 0 12 0C8.69143 0 6 2.69143 6 6C6 9.30857 8.69143 12 12 12Z" fill={activeTab === ACTIVE_TAB.MEMBERS ? '#4299e1' : 'white'} />
      <path d="M24 15C25.9463 16.4566 27.2886 18.3988 27.2886 20.9653V24H34V20.9653C34 17.4624 28.1275 15.4682 24 15Z" fill={activeTab === ACTIVE_TAB.MEMBERS ? '#4299e1' : 'white'} />
      <path d="M22.4 12C25.488 12 28 9.30857 28 6C28 2.69143 25.488 0 22.4 0C21.536 0 20.736 0.222857 20 0.6C21.008 2.12571 21.6 3.99429 21.6 6C21.6 8.00571 21.008 9.87429 20 11.4C20.736 11.7771 21.536 12 22.4 12Z" fill={activeTab === ACTIVE_TAB.MEMBERS ? '#4299e1' : 'white'} />
    </svg>

  )

  const IconItineray = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M23.3333 7.62044C23.3333 10.8434 20.7229 13.4538 17.5 13.4538C14.2771 13.4538 11.6667 10.8434 11.6667 7.62044C11.6667 4.39753 14.2771 1.78711 17.5 1.78711C20.7229 1.78711 23.3333 4.39753 23.3333 7.62044ZM20.4167 7.62045C20.4167 6.01628 19.1042 4.70378 17.5 4.70378C15.8958 4.70378 14.5833 6.01628 14.5833 7.62045C14.5833 9.22462 15.8958 10.5371 17.5 10.5371C19.1042 10.5371 20.4167 9.22462 20.4167 7.62045ZM17.5 17.1725C14.0583 13.9642 9.45 11.9954 4.375 11.9954V28.0371C9.45 28.0371 14.0583 30.0059 17.5 33.2142C20.9417 30.0204 25.55 28.0371 30.625 28.0371V11.9954C25.55 11.9954 20.9417 13.9642 17.5 17.1725ZM17.5 29.4225C20.5187 27.2059 24.0188 25.8059 27.7083 25.31V15.1746C24.6458 15.7288 21.8021 17.1434 19.4833 19.3017L17.5 21.1538L15.5167 19.2871C13.1979 17.1288 10.3542 15.7142 7.29167 15.16V25.2954C10.9812 25.7913 14.4958 27.2059 17.5 29.4225Z" fill={activeTab === ACTIVE_TAB.ITINERARY ? '#4299e1' : 'white'} />
    </svg>
  )

  const IconPreTrip = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.4867 2.91602C9.43672 2.91602 2.91797 9.44935 2.91797 17.4994C2.91797 25.5494 9.43672 32.0827 17.4867 32.0827C25.5513 32.0827 32.0846 25.5494 32.0846 17.4994C32.0846 9.44935 25.5513 2.91602 17.4867 2.91602ZM18.9596 18.9577V10.2077H16.043V18.9577H18.9596ZM18.9596 24.791V21.8743H16.043V24.791H18.9596ZM5.83464 17.4993C5.83464 23.9452 11.0555 29.166 17.5013 29.166C23.9471 29.166 29.168 23.9452 29.168 17.4993C29.168 11.0535 23.9471 5.83268 17.5013 5.83268C11.0555 5.83268 5.83464 11.0535 5.83464 17.4993Z" fill={activeTab === ACTIVE_TAB.PRETRIP ? '#4299e1' : 'white'} />
    </svg>

  )

  const IconCheckList = () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M27.7083 4.37565H21.6125C21 2.68398 19.3958 1.45898 17.5 1.45898C15.6042 1.45898 14 2.68398 13.3875 4.37565H7.29167C5.6875 4.37565 4.375 5.68815 4.375 7.29232V30.6256C4.375 32.2298 5.6875 33.5423 7.29167 33.5423H27.7083C29.3125 33.5423 30.625 32.2298 30.625 30.6256V7.29232C30.625 5.68815 29.3125 4.37565 27.7083 4.37565ZM17.5 4.37565C18.3021 4.37565 18.9583 5.0319 18.9583 5.83398C18.9583 6.63607 18.3021 7.29232 17.5 7.29232C16.6979 7.29232 16.0417 6.63607 16.0417 5.83398C16.0417 5.0319 16.6979 4.37565 17.5 4.37565ZM7.29167 7.29232V30.6257H27.7083V7.29232H24.7917V11.6673H10.2083V7.29232H7.29167Z" fill={activeTab === ACTIVE_TAB.CHECKLIST ? '#4299e1' : 'white'} />
    </svg>

  )

  const IconPhone = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.61 14.99 15.86 14.89 16.12 14.89C16.22 14.89 16.33 14.9 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3ZM6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02Z" fill="#718096" />
    </svg>
  )

  const IconEmail = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12V13.43C22 15.4 20.47 17 18.5 17C17.31 17 16.19 16.42 15.54 15.53C14.64 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12V13.43C17 14.22 17.71 15 18.5 15C19.29 15 20 14.22 20 13.43V12C20 7.66 16.34 4 12 4C7.66 4 4 7.66 4 12C4 16.34 7.66 20 12 20H17V22H12C6.48 22 2 17.52 2 12ZM9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12Z" fill="#718096" />
    </svg>
  )


  return (
    <Page>
      <div data-component="header">
        <div data-component="carrousell" />
        <div data-component="info">
          <div data-component="title">{organization.cn}</div>
          <div data-component="subtitle">
            {reservation.program.name}
          </div>
          <div className="flex">
            <div className="w-2/4 font-thin text-xs">{`From ${moment(reservation.serviceFrom).format('MMM DD, YYYY')} to ${moment(reservation.serviceTo).format('MMM DD, YYYY')}`}</div>
            <div className="w-2/4 font-thin text-xs">{`${reservation.program.bedNights} nights / ${reservation.program.serviceDaysQuantity} service days`}</div>
          </div>
        </div>
        <div
          className="bg-black"
          data-component="header-toolbar"
        >
          <div data-component={activeTab === ACTIVE_TAB.CONTACT ? 'icon-selected' : 'icon'} onClick={() => setActiveTab(ACTIVE_TAB.CONTACT)}>
            <IconContact />
            <span>Contact</span>
          </div>
          <div data-component={activeTab === ACTIVE_TAB.PAYMENTS ? 'icon-selected' : 'icon'} onClick={() => setActiveTab(ACTIVE_TAB.PAYMENTS)}>
            <IconCreditCard />
            <span>Payments</span>
          </div>
          <div data-component={activeTab === ACTIVE_TAB.MEMBERS ? 'icon-selected' : 'icon'} onClick={() => setActiveTab(ACTIVE_TAB.MEMBERS)}>
            <IconMember />
            <span>Members</span>
          </div>
          <div data-component={activeTab === ACTIVE_TAB.ITINERARY ? 'icon-selected' : 'icon'} onClick={() => setActiveTab(ACTIVE_TAB.ITINERARY)}>
            <IconItineray />
            <span>Itinerary</span>
          </div>
          <div data-component={activeTab === ACTIVE_TAB.PRETRIP ? 'icon-selected' : 'icon'} onClick={() => setActiveTab(ACTIVE_TAB.PRETRIP)}>
            <IconPreTrip />
            <span>PreTrip</span>
          </div>
          <div data-component={activeTab === ACTIVE_TAB.CHECKLIST ? 'icon-selected' : 'icon'} onClick={() => setActiveTab(ACTIVE_TAB.CHECKLIST)}>
            <IconCheckList />
            <span>CheckList</span>
          </div>

        </div>
      </div>
      {renderActiveTab()}
    </Page>
  )
}
