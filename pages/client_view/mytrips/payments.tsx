import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { businessService } from '../../../services/index'
import ProgramHeader from '../../../components/my_trips/program_header'
import NavBar from '../../../components/my_trips/nav_bar'
import PreTripInfo from '../../../components/my_trips/pre_trip_info'
import Loading from '../../../components/loading'

export interface Payment {
  title: string,
  reservation: string
  invoiceDate: string
  charges: Array<string | number>
  receivedAmount?: number
  receivedDate?: string
  receivedCard?: string
}

export default () => {
  const bs = businessService
  const [payment, setPayment] = useState([])
  const [program, setProgram] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const resolve = await bs.getClientTrip(null)
      setPayment(resolve[0].payment)
      setProgram(resolve[0].program)
    }
    fetchData()
  }, []) // usar el use effect para trabajar el momento del load de la pagina

  if (payment.length == 0) return <Loading />

  return (
    <div>
      <ProgramHeader program={program} />
      <NavBar />
      <PreTripInfo />
      <div className="payment_info p-2 m-5 rounded-lg border-2">
        <header>{payment.title}</header>
        <article className="payment_items mt-5">
          { payment.charges.map((charge:any) => (
            <div key={charge.text} className="payment_charge mt-1">
              <p>{charge.text}</p>
              <p>
                {charge.amount}
              </p>
            </div>
          ))}
        </article>
        <article className="payment_total mt-5 pt-3 border-dashed border-t-2">
          <strong>Total</strong>
          <strong>
            {payment.charges.reduce((total, charge) => total + parseInt(charge.amount, 10), 0)}
          </strong>
          <div className="mt-4">
            <CreditCard color="black" />
            Your Payment
          </div>
          <div className="mt-4">
            {payment.receivedAmount}
          </div>
          <div>
            {moment(payment.receivedDate).format('Do MMM')}
            /
            {payment.receivedCard}
          </div>
        </article>
        <article className="payment_balance mt-5 pt-3 border-dashed border-t-2">
          <div className="payment_balance_detail">
            <strong>Balance</strong>
            <strong>
$
              {payment.charges.reduce((total, charge) => total + parseInt(charge.amount, 10), 0) - payment.received_amount}
            </strong>
          </div>
          <div className="mt-5 text-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-md">
              <CreditCard color="white" />
              Pay Balance
            </button>
          </div>
        </article>
        <article className="payment_download pl-5 mt-5 pt-3 border-solid border-t-2">
          <Download />
          <p className="text-blue-500">DOWNLOAD INVOICE</p>
        </article>
        <article className="payment_reservation pl-5 mt-5 pt-3 border-solid border-t-2">
          <p>
            Reservation Nr. #
            {payment.reservation}
          </p>
          <p>
            Invoice date:
            {moment(payment.invoiceDate).format('Do MMM')}
          </p>
        </article>
      </div>
      <style>
        {
                `
                .payment_info header {
                  font-weight: 600;
                  font-size: 18px;
                  line-height: 25px;
                  letter-spacing: 0.15px;
                }
                .payment_charge {
                  display: grid;
                  grid-template-columns: 75% 25%;
                }
                .payment_total {
                  display: grid;
                  grid-template-columns: 75% 25%;
                  font-size: 18px;
                  line-height: 25px;
                  letter-spacing: 0.15px;
                }
                .payment_total div {
                  font-size: 14px;
                  line-height: 19px;
                }
                .payment_total div svg, .payment_balance button svg {
                  display: inline-block;
                }
                .payment_balance .payment_balance_detail {
                  display: grid;
                  grid-template-columns: 75% 25%;
                }
                .payment_download p {
                  font-weight: 600;
                  font-size: 14px;
                  line-height: 18px;
                  display: flex;
                  align-items: center;
                  letter-spacing: 1.25px;
                }
                .payment_download {
                  display: grid;
                  grid-template-columns: 1fr 5fr;
                }
                .payment_reservation {
                  font-size: 12px;
                  line-height: 16px;
                  align-items: center;
                  letter-spacing: 0.15px;
                }
                `
            }
      </style>
    </div>
  )
}

const CreditCard = (color: string) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 3.5H3.5C2.52875 3.5 1.75875 4.27875 1.75875 5.25L1.75 15.75C1.75 16.7212 2.52875 17.5 3.5 17.5H17.5C18.4713 17.5 19.25 16.7212 19.25 15.75V5.25C19.25 4.27875 18.4713 3.5 17.5 3.5ZM17.5 15.75H3.5V10.5H17.5V15.75ZM3.5 7H17.5V5.25H3.5V7Z" fill={color.color} fillOpacity="0.54" />
  </svg>
)

const Download = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.59 7.09L10 9.67V0H8V9.67L5.41 7.09L4 8.5L9 13.5L14 8.5L12.59 7.09ZM16 16V9H18V16C18 17.1 17.1 18 16 18H2C0.9 18 0 17.1 0 16V9H2V16H16Z" fill="#4299E1" />
  </svg>
)
