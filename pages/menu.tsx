import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import bs from '../services/business'
import Loading from '../components/loading'

interface Row {
  title: string
  func: any
}

interface Avatar {
  user: string
  message: string
  photoAvatar: string
}

const Row = (props: Row) => {
  const { title, func } = props
  return (
    <div className=" ml-4 mt-4  mr-4" onClick={func}>
      <p className="text-white font-light">{title}</p>
    </div>
  )
}
const Avatar = (props: Avatar) => {
  const {
    user, message, photoAvatar,
  } = props
  return (
    <div className="content m-auto pb-8 ">
      <img src={photoAvatar} alt="" className="rounded-full w-24 m-auto" />

      <div className="flex flex-col ml-2 mr-4 text-center text-white">
        <h6 className="text-white font-semibold mt-4">{user}</h6>
        <p className="text-xs">{message}</p>

      </div>


    </div>
  )
}


export default () => {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<TokenOuttripper>(null)
  const router = useRouter()

  useEffect(() => {
    const fetch = async () => {
      setToken(await bs.getToken())
      setIsLoading(false)
    }

    fetch()
  }, [])

  const TODOFunction = () => {
    console.log('this feature must be developed')
  }

  if (isLoading) return <Loading />

  return (
    <div className="bg-gradient p-8">

      <Avatar user={token.userCn} message={token.rol} photoAvatar={token.photoAvatar} />
      <Row title="Programs Management" func={TODOFunction} />
      <Row title="Notifications" func={TODOFunction} />
      <Row title="Account Settings" func={TODOFunction} />
      <Row title="Bookings" func={TODOFunction} />
      <Row title="Help Center" func={TODOFunction} />
      <Row title="Payment" func={TODOFunction} />
      <Row title="Contacts" func={TODOFunction} />
      <Row title="Profile" func={TODOFunction} />
      <Row title="Invoices" func={TODOFunction} />
      <Row title="New Quick Program" func={TODOFunction} />
      <Row title="MarketPlace" func={TODOFunction} />
      <Row title="Questionnaire setup" func={TODOFunction} />
      <Row title="Notifications Setup" func={TODOFunction} />
      <Row title="Become Premium" func={TODOFunction} />
      <Row title="Exit" func={() => router.push('/home')} />
    </div>
  )
}
