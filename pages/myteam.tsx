/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import useForm from 'react-hook-form'
import moment from 'moment'
import bs from '../services/business'
import Loading from '../components/loading'
import BottomBar from '../components/bottom_nav_bar'
import AddButton from '../components/add_button'
import Auth from '../components/authorization'

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
    <Auth>
      <div className="m-4">
        <header className="flex mt-4">
          <div><span className="text-2xl font-semibold text-gray-700">{'<'}</span></div>
          <div className="mx-4"><span className="text-2xl font-semibold text-gray-700">My Team</span></div>
        </header>
        <article className="my-4">
          <ul>
            {inviteList.map((i: Invitation) => (
              <li key={i.id} className="flex-cols items-center py-5 border-b">
                <div className="">{i.status === 'SEND' || i.status === 'CANCELLED' ? i.emailDestination : i.userCreated.cn}</div>
                <div><span className="text-xs font-thin">{`Created At TODO, by${moment(i.createdOn).format('DDD-MM-YYYY')}`}</span></div>
                {i.status === 'ACCEPTED' ? <div className="text-xs font-thin">{`Accepted on ${moment(i.approbedOn).format('DDD-MM-YYYY')}`}</div> : ''}
                <div className="flex justify-end ">
                  <div className="w-18 px-2">{i.status === 'SEND' ? <div className="ml-2 w-18 p-2 rounded bg-teal-500 text-white">Re Send</div> : ''}</div>
                  <div className="w-18">{i.status === 'SEND' ? <div className="ml-2 w-18 p-2 rounded bg-red-500 text-white">Cancel</div> : <div data-organization-kind="*" data-role-allowed={['COOWNER']} className="ml-2 w-18 p-2 rounded bg-red-500 text-white"> Revoke</div>}</div>
                </div>
                <div />
              </li>
            ))}
          </ul>
        </article>
        <AddButton function={() => setShowNewInvite(true)} />
        <BottomBar />
      </div>
    </Auth>
  )
}
