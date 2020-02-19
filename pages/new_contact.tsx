import React, { useState } from 'react'
import useForm from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import uuid4 from 'uuid4'
import { newContact } from '../redux/actions/contact_calendar'
import { StoreData } from '../redux/store'
import Loading from '../components/loading'

interface FormData {
  lastName: string
  firstName: string
  email: string
}

export default () => {
  const { register, handleSubmit } = useForm() // initialise the hook
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const callingPage : string = useSelector((state: StoreData) => state.contactCalendar.callingPage)

  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    dispatch(newContact({
      ...data,
      id: uuid4(),
    }))
    router.push(callingPage)
  }


  if (isLoading) return <Loading />

  return (
    <div className="mx-4">
      <div className="flex items-center mt-8">
        <Link href="/contact_list">
          <div><IconArrowLeft /></div>
        </Link>

        <div className="ml-4"><h1 className="text-2xl font-semibold"> New Contact</h1></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-cols mt-8">

        <label htmlFor="firstName">
          <div className="mt-4">
            <span className="text-base mt-2">First Name</span>
            <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" name="firstName" type="text" ref={register} />
          </div>
        </label>

        <label htmlFor="lastName">
          <div className="mt-4">
            <span>Last Name</span>
            <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" name="lastName" type="text" ref={register} />
          </div>
        </label>
        <label htmlFor="email" className="mt-4">
          <div className="mt-4">
            <span>Email</span>
            <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" name="email" type="email" ref={register} />
          </div>
        </label>
        <div className="px-6 py-2 bg-teal-500 rounded mt-8 flex justify-center w-1/4">
          <input className="flex bg-transparent text-white" type="submit" />
        </div>
      </form>
    </div>
  )
}

const IconArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.8287 18.9995C13.5367 18.9995 13.2467 18.8725 13.0487 18.6265L8.22066 12.6265C7.92266 12.2555 7.92666 11.7255 8.23166 11.3595L13.2317 5.3595C13.5847 4.9355 14.2157 4.8785 14.6407 5.2315C15.0647 5.5845 15.1217 6.2155 14.7677 6.6395L10.2927 12.0105L14.6077 17.3725C14.9537 17.8025 14.8857 18.4325 14.4547 18.7785C14.2707 18.9275 14.0487 18.9995 13.8287 18.9995Z" fill="#231F20" />
    <mask id="mask0L" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="5" width="7" height="14">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.8287 18.9995C13.5367 18.9995 13.2467 18.8725 13.0487 18.6265L8.22066 12.6265C7.92266 12.2555 7.92666 11.7255 8.23166 11.3595L13.2317 5.3595C13.5847 4.9355 14.2157 4.8785 14.6407 5.2315C15.0647 5.5845 15.1217 6.2155 14.7677 6.6395L10.2927 12.0105L14.6077 17.3725C14.9537 17.8025 14.8857 18.4325 14.4547 18.7785C14.2707 18.9275 14.0487 18.9995 13.8287 18.9995Z" fill="white" />
    </mask>
    <g mask="url(#mask0L)">
      <rect width="24" height="24" fill="#0D1C2E" />
    </g>
  </svg>

)
