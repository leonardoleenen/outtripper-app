import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ClipboardJS from 'clipboard'
import uuid4 from 'uuid4'
import Panel from './panel'
import bs from '../../services/business'
import { setMyTripReservation } from '../../redux/actions/mytrip'

interface Props {
  reservation: Reservation
}

export default (props: Props) => {
  const { reservation } = props
  const paxs = reservation.pax
  const [showInviteDrawler, setShowInviteDrawler] = useState(false)
  const [showDrawlerDelete, setShowDrawlerDelete] = useState(false)
  const [tripLinkCopied, setTripLinkCopied] = useState(false)
  const [paxSelected, setPaxSelected] = useState<Contact>(null)
  const [myTripLink, setMyTripLink] = useState<string>('')
  const dispatch = useDispatch()

  useEffect(() => {
    const b = new ClipboardJS('.btn-myTripLink')
  }, [])

  const mailTo = paxSelected ? paxSelected.email : ''
  const mailSubject = `Your trip  ${reservation.program.name} is comming soon`
  const mailBody = paxSelected ? `Hi ${paxSelected.firstName}, your next trip is Comming Soon!. ${reservation.pax[0].firstName} ${reservation.pax[0].lastName} has invited to you to like party member!. For information, payment options, checklist and cool stuff, please copy this link and paste in your browser: ${myTripLink}` : ''


  const deleteGuest = () => {
    const index : number = reservation.pax.filter((p:Contact) => p).map((p:Contact) => p.id).indexOf(paxSelected.id)
    reservation.pax[index] = null
    bs.updateReservation(reservation)
    dispatch(setMyTripReservation(reservation))
    setShowDrawlerDelete(false)
  }

  const generateVoucherURL = (idReservationToken: string) : string => `${window.location.protocol}//${window.location.host}/consumer/mytrip?accessToken=${idReservationToken}`


  const getReservationTokenUrl = (pax: Contact) => {
    bs.getReservationAccessTokenByReservationIdAndContact(reservation.id, pax).then((reservationToken: ReservationToken) => {
      if (reservationToken) {
        setMyTripLink(generateVoucherURL(reservationToken.id))
      } else {
        bs.createReservationAccessToken(uuid4(), reservation.id, pax).then((newReservationToken: ReservationToken) => {
          setMyTripLink(generateVoucherURL(newReservationToken.id))
        })
      }
    })
  }


  const DrawlerDelete = () => (
    <div className="fixed bg-white h-64 w-full inset-x-0 bottom-0 text-gray-800 rounded-t-lg ">
      <div className="text-center">
        <div className="text-center text-gray-800 text-base font-bold mt-8">Delete Leonardo Leenen</div>
        <div className="text-gray-600 mx-4 mt-4 text-center">Are you sure you would like to delete this guest?</div>
        <div className="flex justify-center mt-4 text-gray-900 font-semibold">
          <div className="p-4 mx-2 w-40 bg-orange-300 rounded-lg shadow" onClick={() => deleteGuest()}>Yes, delete</div>
          <div className="p-4 mx-2 w-40 bg-gray-300 rounded-lg shadow" onClick={() => setShowDrawlerDelete(false)}>No, go back</div>
        </div>
      </div>

    </div>
  )

  const DrawlerInvite = () => (
    <div className="fixed bg-white h-64 w-full inset-x-0 bottom-0 text-gray-800 rounded-t-lg">
      <header className="flex p-4">
        <div className="text-sm text-gray-600 w-full">{`Invite to ${paxSelected.firstName}, ${paxSelected.lastName}`}</div>
        <div className="text-base font-semibold" onClick={() => setShowInviteDrawler(false)}>Close</div>
      </header>
      <article>
        {myTripLink ? (
          <div>
            <div className="flex justify-center p-4">
              <a href={`https://wa.me/?text=${myTripLink}`}>
                <div className="w-40 px-8 py-4 bg-gray-300 shadow rounded-lg text-center">WhatsApp</div>
              </a>
              <a href="sms:;body=Hello my friend">
                <div className="ml-4 w-40 px-8 py-4 bg-gray-300 shadow rounded-lg  text-center">SMS</div>
              </a>
            </div>
            <div className="flex justify-center p-4">
              <a href={`mailto:${mailTo}&subject=${mailSubject}&body=${mailBody}`}>
                <div className="w-40 px-8 py-4 bg-gray-300 shadow rounded-lg  text-center">Email</div>
              </a>
              <button
                onClick={() => setTripLinkCopied(true)}
                type="button"
                data-clipboard-text={myTripLink}
                className="btn-myTripLink ml-4 w-40 px-8 py-4 bg-gray-300 shadow rounded-lg  text-center"
              >
                {!tripLinkCopied ? 'Copy Link' : 'Copied!!'}
              </button>
            </div>
          </div>
        ) : <div><IconSpinner /></div>}
      </article>
    </div>
  )
  return (
    <div>
      <header>
    Who you are travelling with
      </header>
      <article>
        {paxs.map((p:Contact, index: number) => (p ? (
          <Panel key={`guest${index.toString()}`}>
            <div>
              <div>{p.avatar ? (<div className="flex justify-center"><img className="h-16 w-16 rounded-full " alt="e" src={p.avatar} /></div>) : (<div className="flex items-center justify-center"><div className="h-16 w-16 rounded-full flex items-center bg-teal-800"><IconClock /></div></div>)}</div>
              <div className="p-2 flex text-sm text-white justify-center font-semibold">
                <div>{`${p.firstName}, ${p.lastName} `}</div>
              </div>
              <footer className="py-2 flex justify-center text-gray-500 text-sm font-semibold underline">
                <div className="px-4">See itinerary</div>
                <div
                  className="px-4"
                  onClick={() => {
                    setPaxSelected(p)
                    setMyTripLink('')
                    getReservationTokenUrl(p)
                    setTripLinkCopied(false)
                    setShowInviteDrawler(true)
                  }}
                >
                Invite

                </div>
                {index !== 0 ? (
                  <div
                    className="px-4"
                    onClick={() => {
                      setPaxSelected(p)
                      setShowDrawlerDelete(true)
                    }}
                  >
                Delete guest
                  </div>
                ) : ''}
              </footer>
            </div>
          </Panel>
        ) : (
          <div className="mt-4 p-4 bg-teal-900 rounded-lg text-gray-100 font-thin">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-teal-700 flex"><IconQuestion /></div>
            </div>
            <div>
              <div className="p-2 text-sm text-white text-center font-semibold">Anonymous guest</div>
            </div>
            <div>
              <div className="p-2 text-sm text-center underline text-gray-300 font-semibold">Invite</div>
            </div>
          </div>
        )))}
      </article>
      {showInviteDrawler ? <DrawlerInvite /> : ''}
      {showDrawlerDelete ? <DrawlerDelete /> : ''}
    </div>
  )
}

const IconClock = () => (
  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6823 25.2783C19.3642 25.2783 24.8683 19.7741 24.8683 13.0922C24.8683 6.41027 19.3525 0.894474 12.6823 0.894474C6.00033 0.894474 0.496191 6.41027 0.496191 13.0922C0.496191 19.7741 6.00033 25.2783 12.6823 25.2783ZM12.6823 22.5379C7.44633 22.5379 3.24826 18.3281 3.24826 13.0922C3.24826 7.85627 7.43467 3.63488 12.6823 3.63488C17.9182 3.63488 22.1279 7.85627 22.1396 13.0922C22.1396 18.3281 17.9182 22.5379 12.6823 22.5379ZM6.97988 14.7131H12.6823C13.2537 14.7131 13.7084 14.2583 13.7084 13.6753V6.23535C13.7084 5.66395 13.2537 5.20916 12.6823 5.20916C12.0992 5.20916 11.6444 5.66395 11.6444 6.23535V12.6491H6.97988C6.39681 12.6491 5.95368 13.1039 5.95368 13.6753C5.95368 14.2583 6.39681 14.7131 6.97988 14.7131Z" fill="#38B2AC" />
  </svg>

)

const IconQuestion = () => (
  <svg width="15" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.799805 6.16033H4.24116C4.35831 4.34447 5.57377 3.18759 7.46286 3.18759C9.30801 3.18759 10.5381 4.31518 10.5381 5.86745C10.5381 7.31721 9.92306 8.10799 8.10719 9.2063C6.08631 10.3925 5.23696 11.7104 5.36875 13.8778L5.3834 14.9175H8.78082V14.0681C8.78082 12.6037 9.32265 11.8422 11.241 10.7293C13.2326 9.54311 14.3456 7.97619 14.3456 5.73565C14.3456 2.51396 11.6657 0.200195 7.65323 0.200195C3.30394 0.200195 0.916957 2.71898 0.799805 6.16033ZM7.12604 21.8002C8.31221 21.8002 9.24943 20.8776 9.24943 19.7207C9.24943 18.5639 8.31221 17.6559 7.12604 17.6559C5.93987 17.6559 4.98801 18.5639 4.98801 19.7207C4.98801 20.8776 5.93987 21.8002 7.12604 21.8002Z" fill="#38B2AC" />
  </svg>
)

const IconSpinner = () => (
  <svg
    style={{
      margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto',
    }}
    width="200px"
    height="200px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g transform="rotate(0 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(30 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(60 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(90 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(120 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(150 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(180 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(210 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(240 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(270 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(300 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(330 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#285e61">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
      </rect>
    </g>
  </svg>
)
