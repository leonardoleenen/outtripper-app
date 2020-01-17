/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import useForm from 'react-hook-form'
import bs from '../services/business'
import Loading from '../components/loading'


interface FormData {
  email: string
}

export default () => {
  const { register, handleSubmit } = useForm()
  const [showNewInvite, setShowNewInvite] = useState()
  const [inviteList, setInviteList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState([])

  useEffect(() => {
    const fetch = async () => {
      setInviteList(await bs.getInvitations())
      setRoles(await bs.getRoles())
    }
    fetch()
  }, [])


  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    // TODO: Implements Rol List
    Promise.all([bs.createInvite(data.email, roles.filter((r: Role) => r.id === 'COOWNER')),
      bs.getInvitations()]).then((result) => {
      setInviteList(result[1])
      setShowNewInvite(false)
      setIsLoading(false)
    })
  }

  if (isLoading) return <Loading />

  const NewInvite = () => (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            name="email"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            ref={register}
            type="text"
            placeholder="Jane Doe"
            aria-label="Full name"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            <span>Send</span>
          </button>
        </div>
      </form>

    </div>
  )

  if (showNewInvite) { return <NewInvite /> }

  return (
    <div>
      <header>My Team</header>
      <ul>
        {inviteList.map((i: Invitation) => (
          <li key={i.id}>{i.emailDestination}</li>
        ))}
      </ul>
      <button type="button" onClick={() => setShowNewInvite(true)}> New Invite</button>
    </div>
  )
}
