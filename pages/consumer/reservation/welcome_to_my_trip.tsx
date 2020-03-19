/* eslint-disable no-nested-ternary */
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
  const [selectedPaxToEdit, setSelectedPaxToEdit] = useState<Contact>(null)
  const [inputSelected, setInputSelected] = useState(null)

  const [commitmentSplited, setCommitmentSplited] = useState<Array< {
    commitment: PaymentCommitment,
    selected: boolean,
  } >>([])

  const router = useRouter()

  const dispatch = useDispatch()

  const onSubmitNewContact = (data: FormData) => {
    let index : number = null

    if (!selectedPaxToEdit.id) { index = _.indexOf(reservation.pax, null) } else { index = reservation.pax.filter((p:Contact) => p).map((p:Contact) => p.id).indexOf(selectedPaxToEdit.id) }
    reservation.pax[index] = { ...selectedPaxToEdit, id: selectedPaxToEdit.id ? selectedPaxToEdit.id : uuid4() }
    bs.updateReservation(reservation)
    dispatch(setMyTripReservation(reservation))
    setShowNewContactForm(false)
    setInputSelected('firstName')
  }

  const removeGuest = (pax: Contact) => {
    const index : number = reservation.pax.filter((p:Contact) => p).map((p:Contact) => p.id).indexOf(pax.id)
    reservation.pax[index] = null
    bs.updateReservation(reservation)
    dispatch(setMyTripReservation(reservation))
    setShowNewContactForm(false)
  }

  const setSplitTheCheck = () => {
    reservation.paymentCommitments = reservation.pax.filter((p:Contact) => p).map((pax: Contact, index:number) => ({
      amount: reservation.amountOfPurchase / reservation.pax.filter((p:Contact) => p).length,
      pax,
    } as PaymentCommitment))
    dispatch(setMyTripReservation(reservation))
    reservation.paymentCommitments.forEach((pc:PaymentCommitment) => {
      commitmentSplited.push({
        commitment: pc,
        selected: true,
      })
    })
    setCommitmentSplited(commitmentSplited)
    setStage(STAGE.SPLIT)
  }

  const NewContactForm = () => (
    <div className="fixed bottom-0 inset-x-0 px-4 bg-gray-100 rounded-t-lg">
      <form onSubmit={handleSubmit(onSubmitNewContact)}>
        <div>
          <header className="flex py-4">
            <div className="w-full text-sm text-gray-600">Add party member</div>
            <div onClick={() => setShowNewContactForm(false)} className="text-base font-semibold text-gray-700">Close</div>
          </header>
          <fieldset className="p-4 bg-white my-4 shadow-xl">
            <div>First Name</div>
            <input

              onChange={(e) => {
                setInputSelected('firstName')
                setSelectedPaxToEdit({ ...selectedPaxToEdit, firstName: e.target.value })
              }}
              value={selectedPaxToEdit.firstName}
              autoFocus={inputSelected === 'firstName'}
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
              onChange={(e) => {
                setInputSelected('lastName')
                setSelectedPaxToEdit({ ...selectedPaxToEdit, lastName: e.target.value })
              }}
              value={selectedPaxToEdit.lastName}
              autoFocus={inputSelected === 'lastName'}
              className="pl-4 bg-white focus:outline-none focus:shadow-outline rounded-lg py-2 pr-4 block w-full appearance-none leading-normal"
              name="lastName"
              ref={register}
            />
          </fieldset>
          <fieldset className="p-4 bg-white my-4 shadow-xl">
            <div>Email</div>
            <input
              placeholder="john@gmail.com"
              onChange={(e) => {
                setInputSelected('email')
                setSelectedPaxToEdit({ ...selectedPaxToEdit, email: e.target.value })
              }}
              value={selectedPaxToEdit.email}
              autoFocus={inputSelected === 'email'}
              className="pl-4 bg-white focus:outline-none focus:shadow-outline  rounded-lg py-2 pr-4 block w-full appearance-none leading-normal"
              name="email"
              ref={register}
            />
          </fieldset>
          <div className="">
            <div className="flex justify-center"><button className="bg-teal-700 text-white" type="submit"> Save</button></div>
            <div className="flex justify-center p-2 underline text-gray-700 pb-16" onClick={() => removeGuest(selectedPaxToEdit)}><span>Remove Guest</span></div>
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
    reservation.paymentCommitments = commitmentSplited.map((cs) => cs.commitment)
    bs.updateReservation(reservation)
    bs.setPaymentCommitmentKindInReservationAccessToken(stage === STAGE.SPLIT ? PAYMENT_COMMITMENT_KIND.SPLIT : PAYMENT_COMMITMENT_KIND.NO_SLIP, reservationAccessToken)
    router.push(`/consumer/mytrip?accessToken=${reservationAccessToken.id}`)
  }


  const Split = () => {
    const itemClick = (index: number) => {
      if ((commitmentSplited[index].selected) && (commitmentSplited.filter((c) => c.selected).length === 1)) return

      commitmentSplited[index].selected = !commitmentSplited[index].selected

      commitmentSplited.forEach((c, idx) => {
      // eslint-disable-next-line max-len
        commitmentSplited[idx].commitment.amount = c.selected ? reservation.amountOfPurchase / commitmentSplited.filter((cs) => cs.selected).length : 0
      })

      setCommitmentSplited(Object.assign([], commitmentSplited))
    }
    return (
      <div className="h-screen bg-white">
        <header className="flex justify-center p-4">
          <div className="mt-16 mx-12 text-lg font-bold text-center">Split the payments within your team</div>
        </header>
        <div className="p-4">
          <div className="text-base text-center">Total trip balance</div>
          <div className="text-base text-center text-3xl font-semibold text-teal-500">{formatter.format(reservation.amountOfPurchase)}</div>
        </div>

        {commitmentSplited.map((c, index) => (
          <div
            key={`${index.toString()}cms`}
            onClick={() => itemClick(index)}
            className={`m-4 flex p-4 items-center ${c.selected ? 'border border-teal-500' : ''}`}
          >
            <div>
              {c.selected ? <IconChecked /> : <div className="border border-gray-500 rounded-full w-4 h-4" />}
            </div>
            <div className="w-full text-sm ml-4">{`${c.commitment.pax.firstName} ${c.commitment.pax.lastName}`}</div>
            <div className="text-xs w-24">Will pay:</div>
            <div className="text-sm">{formatter.format(c.commitment.amount)}</div>
          </div>
        ))}


        <div className="flex p-4 justify-center">
          <div>
            <button type="button" onClick={() => save()} className="flex px-16 py-4 bg-teal-500 rounded-lg text-white justify-center">Finish</button>
          </div>
        </div>

      </div>
    )
  }

  const SelectPaymentCommitmentKind = () => (
    <div className="">
      <header className="p-4 flex items-center justify-end bg-teal-700">
        <div>
          <button className="text-gray-100" onClick={() => setStage(STAGE.START)} type="button">Back</button>
        </div>
      </header>
      <article className="p-4 bg-gray-100 font-thin h-screen">
        <div className="py-4 text-xl font-bold text-center mt-16">How would you like to manage this trips’ payments?</div>
        <div className="py-2 px-4 mb-4 text-center">This trip could be payed entirely by you, or you can invite other members to pay as well.</div>
        <div className="">
          <div className="flex justify-center">
            <button
              className="p-4 border border-teal-700 rounded-lg px-10 m-2 text-teal-700 w-64"
              type="button"
              onClick={() => {
                bs.setPaymentCommitmentKindInReservationAccessToken(PAYMENT_COMMITMENT_KIND.NO_SLIP, reservationAccessToken)
                router.push(`/consumer/mytrip?accessToken=${reservationAccessToken.id}`)
              }}
            >
I pay entire invoice

            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={() => setSplitTheCheck()} type="button" className="p-4 w-64 bg-teal-700 m-2 rounded-lg text-white">I want to slipt the check</button>
          </div>
          <div className="flex justify-center">
            <div className="pt-2 text-sm font-thin px-4 text-center w-64 italic">If your group splits the check, you will still be responsible for the trips payment.</div>
          </div>
        </div>
      </article>


    </div>
  )

  if (stage === STAGE.SELECT_PAYMENT_COMMITMENT_KIND) return <SelectPaymentCommitmentKind />

  if (stage === STAGE.SPLIT) return <Split />
  return (
    <div className="">
      <header className="p-4 flex items-center justify-end bg-teal-700">
        <div className="pt-4">
          <button className="text-gray-100 font-semibold text-sm" onClick={() => setStage(STAGE.SELECT_PAYMENT_COMMITMENT_KIND)} type="button">Continue </button>
        </div>
      </header>

      <div className={` h-screen p-4 pt-16  ${showNewContactForm ? 'bg-gray-400' : 'bg-gray-100'}`}>
        <div className="text-xl font-bold py-4 text-center">Wecome!  </div>
        <div className="font-thin py-2 text-justify text-center px-8">As a group leader for this trip, we need you to define the other party members, and how will the group pay for this trip.. </div>
        <div className="font-thin py-2 text-justify text-center px-8">Select the empty guests and add the other party members. </div>


        <div className="flex mt-8">
          {reservation.pax.map((p:Contact, index: number) => (
            <div
              onClick={() => {
                if (index === 0) return
                if (!p) {
                  setSelectedPaxToEdit({
                    id: null,
                    firstName: '',
                    lastName: '',
                    email: '',
                  })
                } else { setSelectedPaxToEdit(p) }

                setShowNewContactForm(true)
              }}
              className="w-24 mx-2"
              key={`pax${index.toString()}`}
            >
              <div className="h-16 w-16 bg-teal-600 rounded-full flex">{p ? p.avatar ? <img className="rounded-full" alt="" src={p.avatar} /> : <IconSinglePeople /> : <IconQuestion />}</div>
              <div className="text-sm text-gray-700">{p ? `${p.firstName} ${p.lastName}` : 'Guest'}</div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 inset-x-0 px-4">
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

const IconChecked = () => (
  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.19629 13.9453C11.0107 13.9453 14.1689 10.7871 14.1689 6.97266C14.1689 3.16504 11.0039 0 7.18945 0C3.38184 0 0.223633 3.16504 0.223633 6.97266C0.223633 10.7871 3.38867 13.9453 7.19629 13.9453ZM7.19629 12.7832C3.96973 12.7832 1.39258 10.1992 1.39258 6.97266C1.39258 3.75293 3.96289 1.16211 7.18945 1.16211C10.416 1.16211 13 3.75293 13.0068 6.97266C13.0137 10.1992 10.4229 12.7832 7.19629 12.7832ZM6.33496 10.3906C6.56055 10.3906 6.74512 10.2812 6.88867 10.0693L10.2656 4.75781C10.3545 4.62109 10.4297 4.46387 10.4297 4.31348C10.4297 3.99902 10.1562 3.80762 9.86914 3.80762C9.69141 3.80762 9.51367 3.91016 9.39062 4.11523L6.30762 9.05762L4.72168 7.00684C4.56445 6.80176 4.40039 6.72656 4.21582 6.72656C3.91504 6.72656 3.67578 6.97266 3.67578 7.28027C3.67578 7.43066 3.7373 7.57422 3.83984 7.7041L5.74707 10.0693C5.93164 10.2949 6.10938 10.3906 6.33496 10.3906Z" fill="#38B2AC" />
  </svg>
)

const IconQuestion = () => (
  <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.00012207 5.96014H3.44148C3.55863 4.14427 4.77409 2.98739 6.66317 2.98739C8.50833 2.98739 9.73843 4.11498 9.73843 5.66725C9.73843 7.11702 9.12338 7.9078 7.30751 9.0061C5.28663 10.1923 4.43727 11.5102 4.56907 13.6776L4.58372 14.7173H7.98114V13.8679C7.98114 12.4035 8.52297 11.642 10.4413 10.5291C12.4329 9.34292 13.5459 7.776 13.5459 5.53546C13.5459 2.31376 10.866 0 6.85355 0C2.50426 0 0.117275 2.51878 0.00012207 5.96014ZM6.32636 21.6C7.51253 21.6 8.44975 20.6774 8.44975 19.5205C8.44975 18.3637 7.51253 17.4557 6.32636 17.4557C5.14019 17.4557 4.18833 18.3637 4.18833 19.5205C4.18833 20.6774 5.14019 21.6 6.32636 21.6Z" fill="#CBD5E0" />
  </svg>

)
