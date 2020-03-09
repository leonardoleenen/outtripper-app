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
  const [commitmentSplited, setCommitmentSplited] = useState<Array< {
    commitment: PaymentCommitment,
    selected: boolean,
  } >>([])

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
    reservation.paymentCommitments = commitmentSplited.map((cs) => cs.commitment)
    bs.updateReservation(reservation)
    bs.setPaymentCommitmentKindInReservationAccessToken(stage === STAGE.SPLIT ? PAYMENT_COMMITMENT_KIND.SPLIT : PAYMENT_COMMITMENT_KIND.NO_SLIP, reservationAccessToken)
    router.push(`/consumer/mytrip?accessToken=${reservationAccessToken.id}`)
  }

  const SplitOld = () => (
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
                type="tel"
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
          <div className="p-4 bg-teal-700 rounded-lg text-white ml-2 px-16" onClick={() => save()}>Finish</div>
        </footer>
      </article>
    </div>
  )


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
          <button
            className="p-4 border border-teal-700 rounded-lg px-10 m-2 text-teal-700"
            type="button"
            onClick={() => {
              bs.setPaymentCommitmentKindInReservationAccessToken(PAYMENT_COMMITMENT_KIND.NO_SLIP, reservationAccessToken)
              router.push(`/consumer/mytrip?accessToken=${reservationAccessToken.id}`)
            }}
          >
I pay entire invoice

          </button>
          <button onClick={() => setSplitTheCheck()} type="button" className="p-4 bg-teal-700 m-2 rounded-lg text-white">I want to slipt the check</button>
        </div>
      </article>


    </div>
  )


  //  if (showNewContactForm) { return <NewContactForm /> }

  if (stage === STAGE.SELECT_PAYMENT_COMMITMENT_KIND) return <SelectPaymentCommitmentKind />

  if (stage === STAGE.SPLIT) return <Split />

  console.log(commitmentSplited)
  // if (document.getElementsByClassName('amountToPay').length > 0) document.getElementsByClassName('amountToPay')[0].focus()
  return (
    <div className="">
      <header className="p-4 flex items-center justify-end">
        <div>
          <button className="text-teal-700" onClick={() => setStage(STAGE.SELECT_PAYMENT_COMMITMENT_KIND)} type="button">Continue</button>
        </div>
      </header>

      <div className="bg-gray-100 h-screen p-4">
        <div className="text-2xl font-bold py-4">Wecome!  </div>
        <div className="font-thin py-2 text-justify">As Group Leader we need that you define party members and how they pay for his trip. </div>
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

const IconChecked = () => (
  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.19629 13.9453C11.0107 13.9453 14.1689 10.7871 14.1689 6.97266C14.1689 3.16504 11.0039 0 7.18945 0C3.38184 0 0.223633 3.16504 0.223633 6.97266C0.223633 10.7871 3.38867 13.9453 7.19629 13.9453ZM7.19629 12.7832C3.96973 12.7832 1.39258 10.1992 1.39258 6.97266C1.39258 3.75293 3.96289 1.16211 7.18945 1.16211C10.416 1.16211 13 3.75293 13.0068 6.97266C13.0137 10.1992 10.4229 12.7832 7.19629 12.7832ZM6.33496 10.3906C6.56055 10.3906 6.74512 10.2812 6.88867 10.0693L10.2656 4.75781C10.3545 4.62109 10.4297 4.46387 10.4297 4.31348C10.4297 3.99902 10.1562 3.80762 9.86914 3.80762C9.69141 3.80762 9.51367 3.91016 9.39062 4.11523L6.30762 9.05762L4.72168 7.00684C4.56445 6.80176 4.40039 6.72656 4.21582 6.72656C3.91504 6.72656 3.67578 6.97266 3.67578 7.28027C3.67578 7.43066 3.7373 7.57422 3.83984 7.7041L5.74707 10.0693C5.93164 10.2949 6.10938 10.3906 6.33496 10.3906Z" fill="#38B2AC" />
  </svg>
)
