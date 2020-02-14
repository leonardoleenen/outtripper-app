// This page is only for reservation holder!
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uuid4 from 'uuid4'
import useForm from 'react-hook-form'
import _ from 'underscore'
import { useRouter } from 'next/router'
import bs, { PAYMENT_COMMITMENT_KIND } from '../../../services/business'
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
  const reservation: Reservation = useSelector((state) => state.myTrip.reservation)
  const reservationAccessToken : ReservationToken = useSelector((state) => state.myTrip.reservationAccessToken)
  const { register, handleSubmit } = useForm()
  const [showNewContactForm, setShowNewContactForm] = useState<boolean>(false)
  const [stage, setStage] = useState<STAGE>(STAGE.START)
  const [amountToPay, setAmountToPay] = useState<number>(0)
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
      <header>
        <div>Please, fill data of your partner</div>
      </header>
      <form onSubmit={handleSubmit(onSubmitNewContact)}>
        <div className="p-4">
          <fieldset>
            <div>First Name</div>
            <input className="border" name="firstName" ref={register} />
          </fieldset>
          <fieldset>
            <div>Last Name</div>
            <input className="border" name="lastName" ref={register} />
          </fieldset>
          <fieldset>
            <div>Email</div>
            <input className="border" name="email" ref={register} />
          </fieldset>
          <div>
            <button onClick={() => setShowNewContactForm(false)} className="p-4 border m-2" type="button"> Cancel</button>
            <button className="p-4 border m-2" type="submit"> Save</button>
          </div>
        </div>
      </form>
    </div>
  )

  const updateCommitmentAmount = (index: number, amount: number) => {
    reservation.paymentCommitments[index].amount = amount || 0
    reservation.paymentCommitments[0] = {
      ...reservation.paymentCommitments[0],
      amount: reservation.paymentCommitments[0].amount - (amount || 0),
    } as PaymentCommitment
    dispatch(setMyTripReservation(reservation))
    setAmountToPay(amount || 0)
  }

  const save = () => {
    reservationAccessToken.paymentCommitmentKind = PAYMENT_COMMITMENT_KIND.SPLIT
    bs.updateReservation(reservation)
    bs.setPaymentCommitmentKindInReservationAccessToken(stage === STAGE.SPLIT ? PAYMENT_COMMITMENT_KIND.SPLIT : PAYMENT_COMMITMENT_KIND.NO_SLIP, reservationAccessToken)
    router.push(`/consumer/reservation?accessToken=${reservationAccessToken.id}`)
  }

  const Split = () => (
    <div>
      <div>Please, set the distribution amount</div>
      <div>
        {reservation.paymentCommitments.map((commitment: PaymentCommitment, index: number) => (
          <div className="flex" key={`pax${index.toString()}`}>
            <div className="w-full">
              { index === 0 ? 'Your amount to pay is' : ` ${commitment.pax.firstName}, ${commitment.pax.lastName}`}
            </div>
            <div>
              <input
                className="border"
                value={commitment.amount}
                onChange={(e) => {
                  // e.preventDefault()
                  updateCommitmentAmount(index, parseInt(e.target.value, 10))
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <footer className="flex">
        <div className="p-4 border">Skip</div>
        <div className="p-4 border ml-2" onClick={() => save()}>Save</div>
      </footer>
    </div>
  )

  const SelectPaymentCommitmentKind = () => (
    <div className="p-4">
      <div>A now, we need to knwo how do you want manage your payments of party member</div>
      <div>You can choose pay all you, that means that all invoice will be assigned to you </div>
      <div>Or you can choose slipt the check with your party members</div>
      <div className="flex">
        <button className="border p-4 m-2" type="button">I pay entire invoice</button>
        <button onClick={() => setSplitTheCheck()} type="button" className="border p-4 m-2">I want to slipt the check</button>
      </div>

      <footer>
        <button onClick={() => setStage(STAGE.START)} type="button">BACK</button>
      </footer>
    </div>
  )


  if (showNewContactForm) { return <NewContactForm /> }

  if (stage === STAGE.SELECT_PAYMENT_COMMITMENT_KIND) return <SelectPaymentCommitmentKind />

  if (stage === STAGE.SPLIT) return <Split />

  return (
    <div className="p-4">
      <header>
        <div>Welcome</div>
      </header>
      <div>Your next trip its comming!! </div>
      <div>Before you start to use My Trip for Jurassic Lake at balba for 1 pax we need you to define who are travelling with you and payment distrubution method. </div>
      <div>
        <div>
          {reservation.pax.map((p:Contact) => (p ? <div>{p.firstName}</div> : ''))}
        </div>
        <div>
          {reservation.pax.map((p:Contact) => (!p ? (
            <div className="flex">
              <div className="w-full">
                Guest
              </div>
              <button className="p-2 border mr-4" type="button" onClick={() => setShowNewContactForm(true)}>Invite</button>
            </div>
          ) : ''))}
        </div>
        <footer>
          <button onClick={() => setStage(STAGE.SELECT_PAYMENT_COMMITMENT_KIND)} type="button">SKIP</button>
        </footer>

      </div>
    </div>
  )
}
