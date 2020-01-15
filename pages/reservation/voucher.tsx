/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import uuid4 from 'uuid4'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Loading from '../../components/loading'
import bs from '../../services/business'
import { setCallingPage } from '../../redux/actions/contact_calendar'
import { setCallingFrom as setCallingPaymentPage } from '../../redux/actions/payment'
import '../../statics/style/style.css'


export default () => {
  const [tabSelected, setTabSelected] = useState('INVOICE')
  const [reservation, setReservation] = useState<Reservation>(null)
  const [invoice, setInvoice] = useState<Invoice>(null)
  const [program, setProgram] = useState<Program>(null)
  const [payments, setPayments] = useState<Array<Payment>>(null)
  const [amountOfPayments, setAmountOfPayments] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const dispatch = useDispatch()
  const paxToAdd : Contact = useSelector((state) => state.contactCalendar.contactSelected)
  const router = useRouter()
  const { id, paxIndex } = router.query


  useEffect(() => {
    const fetch = async () => {
      const invoiceList : Array<Invoice> = []
      const r : Reservation = await bs.getReservation(id as string)
      r.invoices.forEach(async (i: string) => {
        invoiceList.push(await bs.getInvoice(i))
        setInvoice(invoiceList[0])
      })


      const programs = await bs.getPrograms()
      const paymentList = await bs.getPaymentsByInvoiceId(invoiceList[0].id)
      setPayments(paymentList)
      setAmountOfPayments(paymentList.length > 0 ? paymentList.map((p : Payment) => p.amount).reduce((total, v) => total += v) : 0)
      setProgram(programs.filter((p:Program) => p.id === invoiceList[0].items.filter((i : ItemInvoice) => i.kind === 'PROGRAM')[0].id)[0])
      if (paxIndex) {
        setReservation(await bs.setPax(r, paxToAdd, parseInt(paxIndex as string, 10)))
        return
      }
      setReservation(r)
    }
    fetch()
  }, [])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })

  const send = () => {
    setIsProcessing(true)
    bs.sendReservationToParticipants(reservation).then((r) => {
      setReservation(r)
      setIsProcessing(false)
    })
  }

  const callContactListForSetPax = (index: number) => {
    dispatch(setCallingPage(`/reservation/voucher?id=${id}&paxIndex=${index}`))
    router.push('/contact_list')
  }


  if (!invoice || !reservation || isProcessing) return <Loading />


  return (
    <div className="h-screen ">
      <header className="bg-teal-700">
        <div className="text-white flex p-2 pt-8">
          <Link href="/availability">
            <div className="h-8 w-8"><IconArrowLeft /></div>
          </Link>
          <div className="font-thin w-full ml-4">{reservation.reservationLabel}</div>
          <div className="h-8 w-8 mr-2"><IconMenu /></div>
        </div>
        <div className="text-white border-b flex  ">
          <div
            onClick={() => setTabSelected('INVOICE')}
            className={`${tabSelected === 'INVOICE' ? 'text-orange-500 font-semibold ' : 'text-gray-500'} text-xl mx-12 py-4 w-3/6 flex justify-center`}
          >
            <span>Invoice</span>
          </div>
          <div
            onClick={() => setTabSelected('GUESTS')}
            className={`${tabSelected === 'GUESTS' ? 'text-orange-500 font-semibold ' : 'text-gray-500'} text-xl mx-12 py-4 w-3/6 flex justify-center`}
          >
            <span>Guests</span>
          </div>
        </div>
        <div className="text-white p-4 flex justify-center">
          <div>
            <span className="text-4xl font-semibold">{formatter.format(invoice.items.map((item: ItemInvoice) => item.price).reduce((total, i) => total += i))}</span>
            <span className="font-thin ml-5">Total group</span>
          </div>
        </div>
        <div className="text-white flex pb-4">
          <div className="w-1/4 flex items-center ">
            <div className={`rounded-full border w-4 h-4 ml-2 ${reservation.status >= 1 ? 'bg-teal-100' : ''}`} />
            <div className="font-thin text-xs ml-2">Send</div>
          </div>
          <div className="w-1/4 flex items-center ">
            <div className={`rounded-full border w-4 h-4 ml-2 ${reservation.status >= 2 ? 'bg-teal-100' : ''}`} />
            <div className="font-thin text-xs ml-2">Visualized</div>
          </div>
          <div className="w-1/4 flex items-center ">
            <div className={`rounded-full border w-4 h-4 ml-2 ${payments && payments.length > 0 ? 'bg-teal-100' : ''}`} />
            <div className="font-thin text-xs ml-2">Partially Paid</div>
          </div>
          <div className="w-1/4 flex items-center ">
            <div className={`rounded-full border w-4 h-4 ml-2 ${invoice.items.map((item: ItemInvoice) => item.price).reduce((total, i) => total += i) - amountOfPayments <= 0 ? 'bg-teal-100' : ''}`} />
            <div className="font-thin text-xs ml-2">Full Paid</div>
          </div>
        </div>
        {!payments || payments.length === 0
          ? (
            <div className="text-white p-2 border-t flex">
              <div className=" h-8 suppercase text-black bg-yellow-300 rounded-lg p-1">Hold</div>
              <div className="w-2/4 ml-4">
                <div>{`${reservation.daysInHold} Days`}</div>
                <div className="font-thin text-xs">{moment(reservation.reservedAt).add(reservation.daysInHold, 'days').format('MMM Do, YYYY')}</div>
              </div>
            </div>
          ) : ''}
      </header>
      <article className="relative">
        <div className="font-semibold text-base text-gray-600 mt-4 ml-4">{`${reservation.pax.length} Guest`}</div>
        <div className=" carrusel py-4 flex border-b pl-4">


          {reservation.pax.map((p:Contact, index:number) => (
            <div
              onClick={() => {
                if (!p) {
                  callContactListForSetPax(index)
                }
              }}
              key={uuid4()}
              className="flex-cols justify-center avatarBox"
            >
              <div className="avatar rounded-full" />
              <div className="text-xs font-semibold text-xs">
                {p ? `${p.lastName}, ${p.firstName}` : 'Guest'}

              </div>
            </div>
          ))}


        </div>
        <div className="pl-4  py-4 border-b flex-cols">
          <div className="flex w-full">
            <div className="text-base font-semibold text-gray-600 w-full">Payments</div>
            <div
              className="h-8 w-8 mr-4"
              onClick={() => {
                dispatch(setCallingPaymentPage(`/reservation/voucher?id=${reservation.id}`))
                router.push(`/pay?invoiceId=${invoice.id}`)
              }}
            >
              <IconAddCircle />

            </div>
          </div>
          <div>
            {payments.map((p: Payment) => (
              <div key={p.id} className="flex text-xs my-2">
                <div className="w-24"><span>{moment(p.date).format('YYYY-MM-DD')}</span></div>
                <div className="w-4/6"><span>{p.kind}</span></div>
                <div className="w-24 mr-4"><span>{`$ ${p.amount.toFixed(2)}`}</span></div>
              </div>
            ))}
          </div>

        </div>
        <div className="pl-4  py-4 border-b flex items-center">
          <div className="text-base font-semibold text-gray-600 w-4/6">{invoice.items.filter((item:ItemInvoice) => item.kind === 'PROGRAM')[0].description}</div>
          <div className="mr-4 text-base font-semibold text-teal-700 flex justify-end"><span>{formatter.format(invoice.items.filter((item:ItemInvoice) => item.kind === 'PROGRAM').map((i: ItemInvoice) => i.price).reduce((total, v) => total += v))}</span></div>
        </div>
        <div className="pl-4  py-4 border-b flex">
          <div className="text-base font-semibold text-gray-600 w-full">Group Extra</div>
          <div className="h-8 w-8 mr-4"><IconAddCircle /></div>
        </div>
        <div className="pl-4  py-4 border-b flex">
          <div className="text-base font-semibold text-gray-600 w-full">Discount</div>
          <div className="h-8 w-8 mr-4"><IconAddCircle /></div>
        </div>
        <div className="pl-4  py-4 border-b flex items-center">

          <div className="text-base font-semibold text-gray-600 w-4/6">Balance</div>
          <div className="mr-4 text-base font-semibold text-teal-700 flex justify-end">
            <span className="">{formatter.format(invoice.items.map((item: ItemInvoice) => item.price).reduce((total, i) => total += i) - amountOfPayments)}</span>
          </div>
        </div>

        <div className="pl-4  py-4 border-b flex-cols">
          <div className="text-base font-semibold text-gray-600 w-full">Terms and Conditions</div>
          <div className="mr-4">
            <span className="font-thin text-base italic text-gray-700">{reservation.termsAndConditionsLiteral}</span>
          </div>
        </div>

        {reservation.status === 0 ? (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gray-200 flex items-center">
            <div className="text-gray-800 w-2/3 mx-4">
              <div className="font-semibold text-black text-sm">{program.name}</div>
              <div className="font-base text-gray-700 text-sm">{`${moment(reservation.serviceFrom).format('MMM Do')} to ${moment(reservation.serviceTo).format('MMM Do')}`}</div>
              <div className="flex justify-start">
                <IconPeople />
                <span className="w-11/12 ml-4 text-xs">{`${reservation.pax.length} Guest - $ ${invoice.items.map((item: ItemInvoice) => item.price).reduce((total, i) => total += i).toFixed(2)}`}</span>
              </div>
            </div>
            <div className="bg-teal-600 p-4 h-12 rounded uppercase text-white font-thin text-sm flex items-center w-1/3 mr-4" onClick={send}>
              <span>Send</span>
            </div>
          </div>
        ) : ''}


      </article>


      <style>
        {`
        
          .avatar {
            background:url('/img/people_avatar.png');
            background-repeat: no-repeat;
            height: 60px;
          }

          .avatarBox {
            width: 90px;
          }
        `}
      </style>
    </div>
  )
}

const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM10 18C10 16.9 10.9 16 12 16C13.1 16 14 16.9 14 18C14 19.1 13.1 20 12 20C10.9 20 10 19.1 10 18Z" fill="white" />
  </svg>

)

const IconArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.8287 18.9995C13.5367 18.9995 13.2467 18.8725 13.0487 18.6265L8.22066 12.6265C7.92266 12.2555 7.92666 11.7255 8.23166 11.3595L13.2317 5.3595C13.5847 4.9355 14.2157 4.8785 14.6407 5.2315C15.0647 5.5845 15.1217 6.2155 14.7677 6.6395L10.2927 12.0105L14.6077 17.3725C14.9537 17.8025 14.8857 18.4325 14.4547 18.7785C14.2707 18.9275 14.0487 18.9995 13.8287 18.9995Z" fill="white" />
    <mask id="mask0AL" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="5" width="7" height="14">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.8287 18.9995C13.5367 18.9995 13.2467 18.8725 13.0487 18.6265L8.22066 12.6265C7.92266 12.2555 7.92666 11.7255 8.23166 11.3595L13.2317 5.3595C13.5847 4.9355 14.2157 4.8785 14.6407 5.2315C15.0647 5.5845 15.1217 6.2155 14.7677 6.6395L10.2927 12.0105L14.6077 17.3725C14.9537 17.8025 14.8857 18.4325 14.4547 18.7785C14.2707 18.9275 14.0487 18.9995 13.8287 18.9995Z" fill="white" />
    </mask>
    <g mask="url(#mask0AL)">
      <rect width="24" height="24" fill="white" />
    </g>
  </svg>

)

const IconPeople = () => (
  <svg className="h-6 w-6" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.49992 2.83203C6.9345 2.83203 5.66659 4.09995 5.66659 5.66536C5.66659 7.23078 6.9345 8.4987 8.49992 8.4987C10.0653 8.4987 11.3333 7.23078 11.3333 5.66536C11.3333 4.09995 10.0653 2.83203 8.49992 2.83203ZM9.91658 5.66536C9.91658 4.8862 9.27908 4.2487 8.49992 4.2487C7.72075 4.2487 7.08325 4.8862 7.08325 5.66536C7.08325 6.44453 7.72075 7.08203 8.49992 7.08203C9.27908 7.08203 9.91658 6.44453 9.91658 5.66536ZM12.7499 12.0404C12.6083 11.5374 10.4124 10.6237 8.49992 10.6237C6.58742 10.6237 4.39159 11.5374 4.24992 12.0474V12.7487H12.7499V12.0404ZM2.83325 12.0404C2.83325 10.1562 6.60867 9.20703 8.49992 9.20703C10.3912 9.20703 14.1666 10.1562 14.1666 12.0404V14.1654H2.83325V12.0404Z" fill="#718096" />
  </svg>
)

const IconAddCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 7V11H7V13H11V17H13V13H17V11H13V7H11ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z" fill="#718096" />
  </svg>

)

const IconProgram = () => (
  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="42" height="42" rx="7.5" fill="#F1F1F1" stroke="#E4E4E4" />
    <path fillRule="evenodd" clipRule="evenodd" d="M21 11C17.13 11 14 14.13 14 18C14 23.25 21 31 21 31C21 31 28 23.25 28 18C28 14.13 24.87 11 21 11ZM16 18C16 15.24 18.24 13 21 13C23.76 13 26 15.24 26 18C26 20.88 23.12 25.19 21 27.88C18.92 25.21 16 20.85 16 18ZM18.5 18C18.5 16.6193 19.6193 15.5 21 15.5C21.8932 15.5 22.7185 15.9765 23.1651 16.75C23.6116 17.5235 23.6116 18.4765 23.1651 19.25C22.7185 20.0235 21.8932 20.5 21 20.5C19.6193 20.5 18.5 19.3807 18.5 18Z" fill="black" fillOpacity="0.54" />
  </svg>

)
