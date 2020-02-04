/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react'
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
  const inviteURLRef = useRef(null)
  const [inviteURL, setInviteURL] = useState('')

  useEffect(() => {
    const fetch = async () => {
      setInviteList(await bs.getInvitations())
      setRoles(await bs.getRoles())
    }
    fetch()
  }, [])

  const copyToClipboard = (value) => {
    setInviteURL(`${window.location.protocol}//${window.location.host}/invite?id=${value}`)
    inviteURLRef.current.select()
    document.execCommand('copy')
  }


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
      <div className="m-4 relative">
        <textarea className="absolute" value={inviteURL} ref={inviteURLRef} style={{ top: ' -1000px' }} />
        <header className="flex mt-4 items-center">
          <div className="mx-4 w-full"><span className="text-2xl font-semibold text-black">My Team</span></div>
          <div className="mr-4" onClick={() => setShowNewInvite(true)}>
            <IconAdd />
          </div>
        </header>
        <article className="my-4 h-screen">
          <ul>
            {inviteList.map((i: Invitation) => (
              <li key={i.id} className="flex-cols items-center py-5 border-b">
                <div className="">{i.status === 'SEND' || i.status === 'CANCELLED' ? i.emailDestination : i.userCreated.cn}</div>
                <div><span className="text-xs font-thin">{`Created At TODO, by${moment(i.createdOn).format('DDD-MM-YYYY')}`}</span></div>
                {i.status === 'ACCEPTED' ? <div className="text-xs font-thin">{`Accepted on ${moment(i.approbedOn).format('DDD-MM-YYYY')}`}</div> : ''}
                <div className="flex justify-end mt-4">
                  {i.status === 'SEND' ? <div className="flex px-2  items-center border rounded border-teal-700" onClick={() => copyToClipboard(i.id)}><div className="text-teal-700">Get Link</div></div> : ''}
                  <div className="w-18 px-2">{i.status === 'SEND' ? <div className="ml-2 w-18 p-2 rounded bg-teal-500 text-white">Re Send</div> : ''}</div>
                  <div className="w-18">{i.status === 'SEND' ? <div className="ml-2 w-18 p-2 rounded bg-red-500 text-white">Cancel</div> : <div data-organization-kind="*" data-role-allowed={['COOWNER']} className="ml-2 w-18 p-2 rounded bg-red-500 text-white"> Revoke</div>}</div>
                </div>
                <div />
              </li>
            ))}
          </ul>
        </article>
        <BottomBar />
      </div>
    </Auth>
  )
}


const IconAdd = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.36035 14.9668C7.68555 14.9668 7.95801 14.7031 7.95801 14.3779V8.26953H13.8906C14.207 8.26953 14.4795 7.99707 14.4795 7.67188C14.4795 7.34668 14.207 7.07422 13.8906 7.07422H7.95801V0.957031C7.95801 0.631836 7.68555 0.368164 7.36035 0.368164C7.03516 0.368164 6.7627 0.631836 6.7627 0.957031V7.07422H0.838867C0.513672 7.07422 0.241211 7.34668 0.241211 7.67188C0.241211 7.99707 0.513672 8.26953 0.838867 8.26953H6.7627V14.3779C6.7627 14.7031 7.03516 14.9668 7.36035 14.9668Z" fill="#1A202C" />
  </svg>

)
