import React from 'react'
import useForm from 'react-hook-form'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { newContact } from '../redux/actions/contact_calendar'
import { StoreData } from '../redux/store'

interface FormData {
  lastName: string
  firstName: string
  email: string
}

export default () => {
  const { register, handleSubmit } = useForm() // initialise the hook
  const router = useRouter()
  const dispatch = useDispatch()
  const callingPage : string = useSelector((state: StoreData) => state.contactCalendar.callingPage)

  const onSubmit = (data: FormData) => {
    dispatch(newContact({ ...data }))
    router.push(callingPage)
  }


  return (
    <div>
      <h1> New Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="first_name">
        First Name
          <input name="first_name" type="text" ref={register} />
        </label>
        <label htmlFor="first_name">
        Last Name
          <input name="last_name" type="text" ref={register} />
        </label>
        <label htmlFor="first_name">
        email
          <input name="email" type="email" ref={register} />
        </label>
        <input type="submit" />
      </form>
    </div>
  )
}
