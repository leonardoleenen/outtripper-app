/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
// This page is only for reservation holder!
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uuid4 from 'uuid4'
import useForm from 'react-hook-form'
import _ from 'underscore'
import { useRouter } from 'next/router'
import bs, { PAYMENT_COMMITMENT_KIND, formatter } from '../../../services/business'
import { setMyTripReservation } from '../../../redux/actions/mytrip'

interface FormData {
  firstName: string,
  lastName: string,
  email: string,
}

enum STAGE {
  START='START',
  SELECT_PAYMENT_COMMITMENT_KIND='SELECT_PAYMENT_COMMITMENT_KIND',
  SPLIT= 'SPLIT'
}

export default () => {
  // const reservation: Reservation = useSelector((state) => state.myTrip.reservation)
  const [reservation, setReservation] = useState<Reservation>(useSelector((state) => state.myTrip.reservation))
  const reservationAccessToken : ReservationToken = useSelector((state) => state.myTrip.reservationAccessToken)
  const { register, handleSubmit } = useForm()
  const [showNewContactForm, setShowNewContactForm] = useState<boolean>(false)
  const [indexPaymentCommitment, setIndexPaymentCommitment] = useState<number>(0)
  const [stage, setStage] = useState<STAGE>(STAGE.START)
  const [amountToPay, setAmountToPay] = useState<number>(reservation.paymentCommitments[0].amount)
  const router = useRouter()

  const dispatch = useDispatch()

  const onSubmitNewContact = (data: FormData) => {
    const index : number = _.indexOf(reservation.pax, null)

    const newContact: Contact = {
      ...data,
      id: uuid4(),
    }
    reservation.pax[index] = newContact
    bs.updateReservation(reservation)
    dispatch(setMyTripReservation(reservation))
    setShowNewContactForm(false)
  }

  const setSplitTheCheck = () => {
    reservation.paymentCommitments = reservation.pax.filter((p:Contact) => p).map((pax: Contact, index:number) => ({
      amount: index === 0 ? reservation.amountOfPurchase : 0,
      pax,
    } as PaymentCommitment))
    dispatch(setMyTripReservation(reservation))
    setStage(STAGE.SPLIT)
  }

  const NewContactForm = () => (
    <div>
      <form onSubmit={handleSubmit(onSubmitNewContact)}>
        <div className="">
          <fieldset className="p-4 bg-white my-4 shadow-xl">
            <div>First Name</div>
            <input
              placeholder="William"
              className="pl-4 bg-white focus:outline-none focus:shadow-outline rounded-lg py-2 pr-4 block w-full appearance-none leading-normal"
              name="firstName"
              ref={register}
            />
          </fieldset>
          <fieldset className="p-4 bg-white my-4 shadow-xl">
            <div>Last Name</div>
            <input
              placeholder="Smith"
              className="pl-4 bg-white focus:outline-none focus:shadow-outline rounded-lg py-2 pr-4 block w-full appearance-none leading-normal"
              name="lastName"
              ref={register}
            />
          </fieldset>
          <fieldset className="p-4 bg-white my-4 shadow-xl">
            <div>Email</div>
            <input
              placeholder="john@gmail.com"
              className="pl-4 bg-white focus:outline-none focus:shadow-outline  rounded-lg py-2 pr-4 block w-full appearance-none leading-normal"
              name="email"
              ref={register}
            />
          </fieldset>
          <div className="p-2 flex items-center justify-center">
            <button onClick={() => setShowNewContactForm(false)} className="p-4 border border-teal-700 rounded-lg px-10 m-2 text-teal-700 " type="button"> Cancel</button>
            <button className="p-4 bg-teal-700 m-2 rounded-lg text-white px-12" type="submit"> Save</button>
          </div>
        </div>
      </form>
    </div>
  )

  const updateCommitmentAmount = (index: number, amount: number) => {
    const oldAmount: number = reservation.paymentCommitments[index].amount
    reservation.paymentCommitments[index].amount = amount
    reservation.paymentCommitments[0] = {
      ...reservation.paymentCommitments[0],
      amount: reservation.paymentCommitments[0].amount + oldAmount - amount,
    } as PaymentCommitment
    setReservation(reservation)
    dispatch(setMyTripReservation(reservation))
  }

  const save = () => {
    reservationAccessToken.paymentCommitmentKind = PAYMENT_COMMITMENT_KIND.SPLIT
    bs.updateReservation(reservation)
    bs.setPaymentCommitmentKindInReservationAccessToken(stage === STAGE.SPLIT ? PAYMENT_COMMITMENT_KIND.SPLIT : PAYMENT_COMMITMENT_KIND.NO_SLIP, reservationAccessToken)
    router.push(`/consumer/mytrip?accessToken=${reservationAccessToken.id}`)
  }

  const Split = () => (
    <div>
      <header className="p-4 flex items-center justify-end">
        <div>
          <button className="text-teal-700" onClick={() => setStage(STAGE.SELECT_PAYMENT_COMMITMENT_KIND)} type="button">Back</button>
        </div>
      </header>
      <article className="h-screen p-4 bg-gray-100">
        <div className="py-4 text-2xl font-bold">Please, indicate how do you do payment collection</div>
        <div className="mt-8">
          <div className="flex justify-center">
            <div>
              <input
                value={amountToPay}
                readOnly={indexPaymentCommitment === 0}
                autoFocus
                onChange={(e) => setAmountToPay(parseInt(e.target.value || '0', 10))}
                onBlur={() => updateCommitmentAmount(indexPaymentCommitment, amountToPay)}
                className="amountToPay text-4xl text-teal-700 font-bold text-center w-64"
              />
            </div>
          </div>
          <div className="flex justify-center"><span className="font-thin">{`Will be charge ${indexPaymentCommitment === 0 ? 'to you' : `to ${reservation.paymentCommitments[indexPaymentCommitment].pax.firstName} ${reservation.paymentCommitments[indexPaymentCommitment].pax.lastName}`}`}</span></div>
        </div>

        <div className="mt-8">
          {reservation.paymentCommitments.map((commitment: PaymentCommitment, index: number) => (
            <div
              onClick={() => {
                setIndexPaymentCommitment(index)
                setAmountToPay(reservation.paymentCommitments[index].amount)
              }}
              className={`flex p-4  my-4 shadow-xl items-center ${indexPaymentCommitment === index ? 'bg-teal-200' : 'bg-white'}`}
              key={`paxCommitment${index.toString()}`}
            >
              <div className="w-full"><span>{`${commitment.pax.firstName} ${commitment.pax.lastName}`}</span></div>
              <div className="flex justify-end w-full">
                <div>
                  <span>{formatter.format(commitment.amount)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <footer className="flex justify-center mt-8">
          <div className="p-4 bg-teal-700 rounded-lg text-white ml-2 px-16" onClick={() => save()}>Save</div>
        </footer>
      </article>
    </div>
  )

  const SelectPaymentCommitmentKind = () => (
    <div className="">
      <header className="p-4 flex items-center justify-end">
        <div>
          <button className="text-teal-700" onClick={() => setStage(STAGE.START)} type="button">Back</button>
        </div>
      </header>
      <article className="p-4 bg-gray-100 font-thin h-screen">
        <div className="py-4 text-2xl font-bold">How do you want manage your payments</div>
        <div className="py-2">A now, we need to knwo how do you want manage your payments of party member</div>
        <div className="py-2">You can choose pay all you, that means that all invoice will be assigned to you </div>
        <div className="py-2">Or you can choose slipt the check with your party members</div>
        <div className="flex">
          <button className="p-4 border border-teal-700 rounded-lg px-10 m-2 text-teal-700" type="button">I pay entire invoice</button>
          <button onClick={() => setSplitTheCheck()} type="button" className="p-4 bg-teal-700 m-2 rounded-lg text-white">I want to slipt the check</button>
        </div>
      </article>


    </div>
  )


  //  if (showNewContactForm) { return <NewContactForm /> }

  if (stage === STAGE.SELECT_PAYMENT_COMMITMENT_KIND) return <SelectPaymentCommitmentKind />

  if (stage === STAGE.SPLIT) return <Split />

  // if (document.getElementsByClassName('amountToPay').length > 0) document.getElementsByClassName('amountToPay')[0].focus()
  return (
    <div className="">
      <header className="p-4 flex items-center justify-end">
        <div>
          <button className="text-teal-700" onClick={() => setStage(STAGE.SELECT_PAYMENT_COMMITMENT_KIND)} type="button">Continue</button>
        </div>
      </header>

      <div className="bg-gray-100 h-screen p-4">
        <div className="text-2xl font-bold py-4">Wecome Leonardo!  </div>
        <div className="font-thin py-2 text-justify">As Group Leader we need that you define who is coming with you and how they pay for his trip. </div>
        <div className="font-thin py-2 text-justify">In this step, we need to define  for all unknown guest, first name, last name and email.</div>
        <div className="font-thin py-2 text-justify">If you dont have this information yet, you shall do do it later. </div>


        <div className="flex mt-8">
          {reservation.pax.map((p:Contact, index: number) => (
            <div
              onClick={() => {
                if (!p) setShowNewContactForm(true)
              }}
              className="w-24 mx-2"
              key={`pax${index.toString()}`}
            >
              <div className="h-16 w-16 bg-teal-600 rounded-full flex"><IconSinglePeople /></div>
              <div className="text-sm text-gray-700">{p ? `${p.firstName} ${p.lastName}` : 'Guest'}</div>
            </div>
          ))}
        </div>

        <div>
          {showNewContactForm ? <NewContactForm /> : ''}
        </div>

      </div>

    </div>
  )
}


const IconSinglePeople = () => (
  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.8624 10.4872C13.4512 10.4872 15.6086 8.20163 15.6086 5.27464C15.6086 2.42929 13.4396 0.190315 10.8624 0.190315C8.29693 0.190315 6.11627 2.45261 6.12793 5.28631C6.12793 8.20163 8.27361 10.4872 10.8624 10.4872ZM3.64407 21.3789H18.0808C20.0749 21.3789 20.7512 20.7375 20.7512 19.6297C20.7512 16.6444 16.903 12.5396 10.8624 12.5396C4.8102 12.5396 0.973633 16.6444 0.973633 19.6297C0.973633 20.7375 1.64999 21.3789 3.64407 21.3789Z" fill="#A1C3C3" />
  </svg>
)
