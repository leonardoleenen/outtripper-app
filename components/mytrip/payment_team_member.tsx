/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useState } from 'react'
import moment from 'moment'
import { loadStripe } from '@stripe/stripe-js'

import { useDispatch, useSelector } from 'react-redux'
import bs, { formatter } from '../../services/business'
import Panel from './panel'
import CheckoutPaymentForm from '../payment_checkout'
import { setMyTripReservation } from '../../redux/actions/mytrip'

interface Props {
  groupLeader: Contact
  purchaseAmount: number
  payments: Array<Payment>
  token: TokenOuttripper
  reservation: Reservation
  reservationToken: ReservationToken
  chargeServiceFeeToCustomer: boolean
  serviceChargeFeeSettings: {
    serviceChargeFeePercentage: number; serviceChargeFeeFixedAmount: number
  }
}


export default (props:Props) => {
  const dispatch = useDispatch()

  // Only force re-render - Monkey patch
  const myTrip = useSelector((state) => state.myTrip)
  const reservationMonkey = useSelector((state) => state.myTrip.reservation)
  const {
    purchaseAmount, payments, groupLeader, reservation, token, reservationToken, serviceChargeFeeSettings, chargeServiceFeeToCustomer,
  } = props


  const items = bs.getUnPaidInstallments(reservation, reservation.pax.filter((p:Contact) => p && p.id === reservationToken.contactId)[0])
    .map((p, index) => ({ id: index.toString(), name: `Due on ${moment(p.installment.dueDate).format('MMM,  Do YYYY')}`, amount: p.balance }))

  const paymentAmount: number = payments.length === 0 ? 0 : payments.map((p:Payment) => p.amount).reduce((t, v) => t += v)
  const paxSelected: Contact = reservation.pax.filter((p:Contact) => p && p.id === reservationToken.contactId)[0]

  const callBack = (result, itemsSelected) => {
    // console.log(result, itemsSelected)
    bs.setAPayment(reservation.invoices[0], itemsSelected.map((i) => i.amount).reduce((t, v) => t += v), 'CREDIT_CARD', new Date().getTime(), 'Trip Payment', paxSelected)
      .then((paymentInserted: Payment) => {
        const index: number = reservation.paymentCommitments.indexOf(reservation.paymentCommitments.filter((p: PaymentCommitment) => p.pax.id === paxSelected.id)[0])
        if (!reservation.paymentCommitments[index].payments) { reservation.paymentCommitments[index].payments = [] }

        reservation.paymentCommitments[index].payments.push(paymentInserted)
        bs.updateReservation(reservation)
        dispatch(setMyTripReservation({ ...reservation }))
      })
  }

  return (
    <div className="p-4">
      <div><span className="text-xl font-semibold">{items.length === 0 ? 'Your trip is fully paid' : 'Your balance is: '}</span></div>

      <div className="pt-2">
        {payments.map((p:Payment) => (
          <div
            key={p.id}
            className="flex pt-2 border-t mt-2 font-thin text-sm"
          >
            <div className="flex">
              <div><IconCreditCard /></div>
            </div>
            <div className="flex justify-end">
              <div className="mr-2 w-full ml-4 "><span className="font-thin">{moment(p.date).format('ddd DD MMM YYYY')}</span></div>
              <div className="flex justify-end"><span className="font-semibold text-gray-700">{formatter.format(p.amount)}</span></div>
            </div>
          </div>
        ))}


        {payments.length === 0 ? '' : (
          <div className="flex justify-end pt-4 mt-4 border-t">
            <div><span className="text-gray-700 uppercase">Total Paid</span></div>
            <div className="ml-2"><span className="font-semibold text-gray-700">{formatter.format(payments.map((p:Payment) => p.amount).reduce((t, v) => t += v))}</span></div>
          </div>
        ) }
      </div>

      {purchaseAmount - paymentAmount === 0 ? <div className="flex  h-64 justify-center items-center"><IconDone /></div> : (
        <div>
          <div className="py-4 flex bg-gray-900 rounded-lg justify-center items-center">
            <span className="font-bold text-teal-700 text-4xl">{formatter.format(purchaseAmount - paymentAmount)}</span>
          </div>
        </div>
      )}

      <Panel>
        <div className="my-2">
          <span className="font-semibold text-white">Terms and Conditions</span>
        </div>
        <div className=""><span className="text-white italic">{reservation.termsAndConditionsLiteral}</span></div>
      </Panel>

      <CheckoutPaymentForm
        chargeServiceFeeToCustomer={chargeServiceFeeToCustomer}
        serviceChargeFeeSettings={serviceChargeFeeSettings}
        callFunction={callBack}
        items={items}
        chargeDescription={`${paxSelected.firstName} ${paxSelected.lastName} - ${reservation.program.name} ${moment(reservation.serviceFrom).format('MMM Do YYYY')}`}
      />


    </div>
  )
}


const IconCreditCard = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM4 8H20V6H4V8Z" fill="#718096" />
  </svg>
)

const IconDone = () => (
  <svg width="149" height="149" viewBox="0 0 149 149" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="74.5" cy="74.5" r="72.5" stroke="#76E2D5" strokeWidth="4" />
    <path fillRule="evenodd" clipRule="evenodd" d="M92.4142 61.6083C93.1953 62.4194 93.1953 63.7344 92.4142 64.5455L70.4142 87.3917C69.6332 88.2028 68.3668 88.2028 67.5858 87.3917L57.5858 77.0071C56.8047 76.196 56.8047 74.8809 57.5858 74.0699C58.3668 73.2588 59.6332 73.2588 60.4142 74.0699L69 82.9859L89.5858 61.6083C90.3668 60.7972 91.6332 60.7972 92.4142 61.6083Z" fill="#81E3D7" />
  </svg>

)
