import React, { useState } from 'react'
import Panel from './panel'

interface Props {
  paxs: Array<Contact>
}

export default (props: Props) => {
  const { paxs } = props
  const [showInviteDrawler, setShowInviteDrawler] = useState(false)
  const [showDrawlerDelete, setShowDrawlerDelete] = useState(false)
  const [paxSelected, setPaxSelected] = useState(null)

  const DrawlerDelete = () => (
    <div className="fixed bg-white h-64 w-full inset-x-0 bottom-0 text-gray-800 rounded-t-lg ">
      <div className="text-center">
        <div className="text-center text-gray-800 text-base font-bold mt-8">Delete Leonardo Leenen</div>
        <div className="text-gray-600 mx-4 mt-4 text-center">Are you sure you would like to delete this guest?</div>
        <div className="flex justify-center mt-4 text-gray-900 font-semibold">
          <div className="p-4 mx-2 w-40 bg-orange-300 rounded-lg shadow">Yes, delete</div>
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
        <div className="flex justify-center p-4">
          <div className="w-40 px-8 py-4 bg-gray-300 shadow rounded-lg text-center">WhatsApp</div>
          <div className="ml-4 w-40 px-8 py-4 bg-gray-300 shadow rounded-lg  text-center">SMS</div>
        </div>
        <div className="flex justify-center p-4">
          <div className="w-40 px-8 py-4 bg-gray-300 shadow rounded-lg  text-center">Email</div>
          <div className="ml-4 w-40 px-8 py-4 bg-gray-300 shadow rounded-lg  text-center">Copy link</div>
        </div>
      </article>
    </div>
  )
  return (
    <div>
      <header>
    Who you are travelling with
      </header>
      <article>
        {paxs.map((p:Contact, index: number) => (
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
        ))}
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
