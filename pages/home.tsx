/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import lunr from 'lunr'
import _ from 'underscore'
import BottomNavBar from '../components/bottom_nav_bar'
import Loading from '../components/loading'
import bs from '../services/business'
import '../statics/style/style.css'
import { IconSearch } from '../statics/icons'

let reservationIndex = null
let reservationFiltered = []
let groupedList = []

export default () => {
  const [reservations, setReservations] = useState<Array<Reservation>>(null)
  const [textToSearch, setTextToSearch] = useState('')
  const router = useRouter()
  useEffect(() => {
    const fetch = async () => {
      const reservationsList = await bs.getMyReservations()
      reservationIndex = lunr(function () {
        this.ref('id')
        this.field('rawText')
        reservationsList.forEach((r: Reservation) => {
          // eslint-disable-next-line no-param-reassign
          r.rawText = `${r.reservationLabel} ${r.reservationHolder.lastName} ${r.reservationHolder.firstName} ${r.pax.map((c:Contact) => (c ? `${c.lastName} ${c.firstName}` : '')).join(' ')}`
          this.add(r)
        })
      })

      setReservations(reservationsList)
    }
    fetch()
  }, [])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })


  if (!reservations) return <Loading />

  if (reservationIndex) {
    reservationFiltered = reservations.filter((c:Reservation) => reservationIndex.search(`*${textToSearch}*`).filter((cf) => cf.ref.trim() === c.id.trim()).length > 0)
    groupedList = _.groupBy(reservationFiltered, (r:Reservation) => r.financialState)
  }

  return (
    <div className="relative h-screen">
      <header className="flex mt-4 items-center">
        <div className="ml-4"><span className="text-2xl font-semibold">My Reservations</span></div>
      </header>
      <div className="flex ml-4 mt-4 h-8">
        <div className=" bg-gray-200 flex items-center pl-4 rounded-l "><IconSearch /></div>
        <input
          value={textToSearch}
          onChange={(e) => setTextToSearch(e.target.value)}
          className=" bg-gray-200 w-full mr-4 pl-4 rounded-r text-gray-800 focus:outline-none"
          placeholder="Search"
        />
      </div>
      {reservations.length === 0 ? <EmptyFrame /> : (
        Object.keys(groupedList).map((name:string) => (
          <div key={name} className="bg-gray-200 font-semibold">
            <div className={`${name === 'NO PAYMENTS' ? 'bg-yellow-300' : name === 'PARTIALLY PAID' ? 'bg-orange-300' : 'bg-green-300'} shadow mx-4 rounded-lg mt-8 p-2 flex`}>
              <div className="w-full">
                <span>{name === 'NO PAYMENTS' ? 'On Hold: ' : name === 'PARTIALLY PAID' ? 'Partially Paid: ' : 'Paid: '}</span>
                <span>{formatter.format(groupedList[name].map((r: Reservation) => (bs.getDuePaymentAmount(r) > 0 ? bs.getDuePaymentAmount(r) : r.amountOfPurchase)).reduce((total, v) => total += v))}</span>
              </div>
              <div className="w-24 mr-4">{name === 'PAID' ? 'Total' : 'Balance'}</div>
            </div>
            {groupedList[name].map((r: Reservation) => (
              <div key={r.id} className="border-b rounded-lg  m-4 bg-white shadow" onClick={() => router.push(`/reservation/voucher?id=${r.id}`)}>
                <div className="flex p-4">
                  <div className="w-full">
                    <div className="flex items-center">
                      <div className="text-xl font-bold">{`${r.reservationHolder.lastName}, ${r.reservationHolder.firstName}`}</div>
                    </div>
                    <div className="flex items-center py-2">
                      <div><IconProgram /></div>
                      <div className="mx-2 font-thin text-xs">{`${r.program.name}`}</div>
                    </div>
                    <div className="flex items-center py-1">
                      <div>
                        <IconCalendar />
                      </div>
                      <div className="mx-2 font-thin text-xs">{` ${moment(r.serviceFrom).format('MMM DDD YYYY')} to ${moment(r.serviceTo).format('MMM DDD YYYY')} `}</div>
                    </div>
                    <div className="flex items-center py-1">
                      <div><IconPeople /></div>
                      <div className="mx-2 font-thin text-xs">{`${r.pax.length}`}</div>
                    </div>
                    <div className="flex items-center py-1">
                      <div>
                        <IconInfo />
                      </div>
                      <div className="mx-2 font-thin text-xs">{`#${r.id} - ${moment(r.reservedAt).format('DD MMM YYYY')}`}</div>
                    </div>
                  </div>

                  { (r.amountOfPurchase - r.amountOfPayment) > 0 ? (
                    <div className="flex-cols ">
                      <div className="flex justify-end text-xl"><span className="font-bold">{formatter.format(bs.getNextInstallmentInDueDate(r).amount)}</span></div>
                      <div className="flex justify-end">
                        <div className="w-full flex justify-end h-5"><span className={`font-thin text-xs px-2 rounded-lg shadow ${bs.getDiffDaysForInstallmentNextDue(r) < 0 ? 'bg-red-200' : 'bg-green-200'}`}>{bs.getDiffDaysForInstallmentNextDue(r) < 0 ? `Overdue ${bs.getDiffDaysForInstallmentNextDue(r) * -1} days` : `Due in ${bs.getDiffDaysForInstallmentNextDue(r)} days`}</span></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-cols ">
                      <div className="flex justify-end text-xl">
                        <span>{formatter.format(r.amountOfPurchase)}</span>
                      </div>
                      <div className="flex items-center justify-end">
                        <div><IconDeposited /></div>
                        <div className="ml-2"><span className="text-base text-teal-700">Deposited</span></div>
                      </div>
                    </div>
                  )}
                </div>

                { (r.amountOfPurchase - r.amountOfPayment) > 0 ? (
                  <div className="flex mx-4 py-2 border-t">
                    <div className="w-full flex items-center">
                      <span className="font-thin text-xs">{`Installments ${bs.getNextInstallmentInDueDate(r).order} / ${r.invoicesObject[0].installments.length}`}</span>
                    </div>
                    <div>
                      <div className="flex justify-end">
                        <span className="font-thin text-xs">Balance</span>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-xl font-thin">{formatter.format(r.amountOfPurchase - r.amountOfPayment)}</span>
                      </div>
                    </div>
                  </div>
                ) : ''}

              </div>
            ))}
          </div>


        ))

      )}
      <style>
        {`
          .verticalText = {
            transform: rotate(-90deg);
            transform-origin: right, top;
            -ms-transform: rotate(-90deg);
            -ms-transform-origin:right, top;
            -webkit-transform: rotate(-90deg);
            -webkit-transform-origin:right, top;
          }
        `}
      </style>
      <BottomNavBar />
    </div>
  )
}

const FreeIcon = () => (
  <svg width="262" height="222" viewBox="0 0 262 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M84.1562 38.4909C86.9317 39.4819 89.5689 39.6078 91.4367 38.8821C90.9586 36.8314 89.3856 34.5791 87.0602 32.6888C87.9931 29.7403 88.1115 26.9387 87.4285 24.9545C85.4981 25.4624 83.3779 27.1334 81.5986 29.6038C78.8231 28.6128 76.1859 28.4869 74.3181 29.2126C74.7963 31.2633 76.3692 33.5156 78.6946 35.4059C77.7618 38.3544 77.6433 41.156 78.3264 43.1402C80.2568 42.6323 82.3769 40.9613 84.1562 38.4909ZM76.2647 77.7413C78.2788 77.9502 80.0731 77.5994 81.2247 76.8023C80.6026 75.5003 79.2138 74.2434 77.3712 73.3546C77.5679 71.215 77.2377 69.3088 76.4873 68.0854C75.2617 68.7463 74.0786 70.2217 73.2419 72.1791C71.2279 71.9702 69.4335 72.321 68.282 73.1181C68.9041 74.4201 70.2929 75.677 72.1355 76.5658C71.9388 78.7054 72.269 80.6116 73.0193 81.835C74.2449 81.1741 75.4281 79.6987 76.2647 77.7413ZM186.194 116.913C184.841 116.53 183.368 115.326 182.144 113.564C180.179 114.225 178.321 114.279 177.015 113.744C177.375 112.307 178.508 110.742 180.167 109.442C179.544 107.354 179.493 105.381 179.997 103.993C181.35 104.376 182.823 105.58 184.047 107.342C186.012 106.681 187.87 106.626 189.176 107.162C188.816 108.599 187.683 110.164 186.024 111.464C186.646 113.551 186.697 115.525 186.194 116.913Z" fill="#D5EDF1" />
    <path fillRule="evenodd" clipRule="evenodd" d="M104.8 51.77V121.075L111.612 121.075V59.5634H150.912V121.075L157.2 121.075V51.77C157.2 48.6957 154.854 46.2034 151.96 46.2034H110.04C107.146 46.2034 104.8 48.6957 104.8 51.77Z" fill="#EEFAFC" />
    <path d="M104.8 121.075H103.3V122.575H104.8L104.8 121.075ZM111.612 121.075L111.612 122.575H113.112V121.075H111.612ZM111.612 59.5634V58.0634H110.112V59.5634H111.612ZM150.912 59.5634H152.412V58.0634H150.912V59.5634ZM150.912 121.075H149.412V122.575H150.912V121.075ZM157.2 121.075V122.575H158.7V121.075H157.2ZM106.3 121.075V51.77H103.3V121.075H106.3ZM111.612 119.575L104.8 119.575L104.8 122.575L111.612 122.575L111.612 119.575ZM113.112 121.075V59.5634H110.112V121.075H113.112ZM111.612 61.0634H150.912V58.0634H111.612V61.0634ZM149.412 59.5634V121.075H152.412V59.5634H149.412ZM157.2 119.575L150.912 119.575V122.575L157.2 122.575V119.575ZM155.7 51.77V121.075H158.7V51.77H155.7ZM151.96 47.7034C153.941 47.7034 155.7 49.4373 155.7 51.77H158.7C158.7 47.954 155.767 44.7034 151.96 44.7034V47.7034ZM110.04 47.7034H151.96V44.7034H110.04V47.7034ZM106.3 51.77C106.3 49.4373 108.059 47.7034 110.04 47.7034V44.7034C106.233 44.7034 103.3 47.954 103.3 51.77H106.3Z" fill="#A3BFC6" />
    <path d="M135.716 52.3267H126.284" stroke="#A3BFC6" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8 10" />
    <path d="M143 40.197C143 26.287 153.387 15 166.212 15C179.038 15 189.424 26.287 189.424 40.197C189.424 51.6271 182.112 60.6778 170.893 64.8719L154.02 70.978C151.235 71.9859 149.349 70.0241 150.255 67.051L152.293 60.3636C146.497 55.6452 143 48.2388 143 40.197Z" fill="white" stroke="#A3BFC6" strokeWidth="3" strokeLinecap="round" />
    <path d="M172.794 38.6671C172.664 38.4436 172.436 38.3079 172.19 38.3033L167.097 38.2089L167.236 29.7054C167.242 29.3406 167.007 29.0207 166.672 28.9387C166.332 28.8551 165.994 29.0359 165.849 29.3658L159.799 43.1725C159.694 43.4087 159.712 43.6874 159.842 43.9079C159.972 44.13 160.2 44.2672 160.446 44.2717L165.54 44.3662L165.4 52.8696C165.394 53.2345 165.629 53.5544 165.964 53.6363C166.014 53.6481 166.065 53.6552 166.115 53.6562C166.397 53.6614 166.663 53.4916 166.787 53.2093L172.838 39.4025C172.94 39.1647 172.926 38.8892 172.794 38.6671Z" fill="#EEFAFC" stroke="#A3BFC6" strokeWidth="3" strokeLinecap="round" />
  </svg>
)


const IconDeposited = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.41675 8.5013C1.41675 4.60547 4.60425 1.41797 8.50008 1.41797C12.3959 1.41797 15.5834 4.60547 15.5834 8.5013C15.5834 12.3971 12.3959 15.5846 8.50008 15.5846C4.60425 15.5846 1.41675 12.3971 1.41675 8.5013ZM2.83341 8.5013C2.83341 11.6251 5.37633 14.168 8.50008 14.168C11.6238 14.168 14.1667 11.6251 14.1667 8.5013C14.1667 5.37755 11.6238 2.83464 8.50008 2.83464C5.37633 2.83464 2.83341 5.37755 2.83341 8.5013ZM12.0417 10.6263V12.043H4.95841V10.6263H12.0417ZM5.95008 6.5888L7.29591 7.93463L11.0501 4.18047L12.0417 5.17213L7.29591 9.91797L4.95841 7.58047L5.95008 6.5888Z" fill="#2c7a7b" />
  </svg>
)

const IconProgram = () => (
  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.91895 6.01172L5.35156 6.02148C5.42969 6.02148 5.45898 6.05078 5.45898 6.12891L5.46875 9.56152C5.46875 10.2012 5.65918 10.7285 6.21094 10.7285C6.6748 10.7285 6.93848 10.3037 7.16309 9.82031L10.835 1.8418C10.9473 1.60254 11.0107 1.38281 11.0107 1.19238C11.0107 0.782227 10.6934 0.469727 10.2881 0.469727C10.0977 0.469727 9.87793 0.533203 9.63379 0.645508L1.66016 4.3125C1.19141 4.52734 0.74707 4.7959 0.74707 5.26465C0.74707 5.81152 1.25977 6.01172 1.91895 6.01172Z" fill="#333333" />
  </svg>

)

const IconCalendar = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.91016 10.0986H8.67773C9.7666 10.0986 10.3428 9.51758 10.3428 8.44336V2.51562C10.3428 1.44141 9.7666 0.865234 8.67773 0.865234H1.91016C0.826172 0.865234 0.245117 1.44141 0.245117 2.51562V8.44336C0.245117 9.52246 0.826172 10.0986 1.91016 10.0986ZM1.95898 8.98047C1.56836 8.98047 1.36328 8.78516 1.36328 8.37988V3.96582C1.36328 3.55566 1.56836 3.36523 1.95898 3.36523H8.62891C9.01465 3.36523 9.22461 3.55566 9.22461 3.96582V8.37988C9.22461 8.78516 9.01465 8.98047 8.62891 8.98047H1.95898ZM4.36621 4.99609H4.64941C4.83008 4.99609 4.88867 4.94238 4.88867 4.7666V4.47852C4.88867 4.30273 4.83008 4.24902 4.64941 4.24902H4.36621C4.18555 4.24902 4.12695 4.30273 4.12695 4.47852V4.7666C4.12695 4.94238 4.18555 4.99609 4.36621 4.99609ZM5.93848 4.99609H6.22656C6.40234 4.99609 6.46094 4.94238 6.46094 4.7666V4.47852C6.46094 4.30273 6.40234 4.24902 6.22656 4.24902H5.93848C5.7627 4.24902 5.69922 4.30273 5.69922 4.47852V4.7666C5.69922 4.94238 5.7627 4.99609 5.93848 4.99609ZM7.51074 4.99609H7.79883C7.97461 4.99609 8.0332 4.94238 8.0332 4.7666V4.47852C8.0332 4.30273 7.97461 4.24902 7.79883 4.24902H7.51074C7.33496 4.24902 7.27637 4.30273 7.27637 4.47852V4.7666C7.27637 4.94238 7.33496 4.99609 7.51074 4.99609ZM2.78906 6.54395H3.07715C3.25293 6.54395 3.31641 6.49023 3.31641 6.31445V6.02637C3.31641 5.85059 3.25293 5.79688 3.07715 5.79688H2.78906C2.61328 5.79688 2.55469 5.85059 2.55469 6.02637V6.31445C2.55469 6.49023 2.61328 6.54395 2.78906 6.54395ZM4.36621 6.54395H4.64941C4.83008 6.54395 4.88867 6.49023 4.88867 6.31445V6.02637C4.88867 5.85059 4.83008 5.79688 4.64941 5.79688H4.36621C4.18555 5.79688 4.12695 5.85059 4.12695 6.02637V6.31445C4.12695 6.49023 4.18555 6.54395 4.36621 6.54395ZM5.93848 6.54395H6.22656C6.40234 6.54395 6.46094 6.49023 6.46094 6.31445V6.02637C6.46094 5.85059 6.40234 5.79688 6.22656 5.79688H5.93848C5.7627 5.79688 5.69922 5.85059 5.69922 6.02637V6.31445C5.69922 6.49023 5.7627 6.54395 5.93848 6.54395ZM7.51074 6.54395H7.79883C7.97461 6.54395 8.0332 6.49023 8.0332 6.31445V6.02637C8.0332 5.85059 7.97461 5.79688 7.79883 5.79688H7.51074C7.33496 5.79688 7.27637 5.85059 7.27637 6.02637V6.31445C7.27637 6.49023 7.33496 6.54395 7.51074 6.54395ZM2.78906 8.09668H3.07715C3.25293 8.09668 3.31641 8.03809 3.31641 7.8623V7.5791C3.31641 7.40332 3.25293 7.34473 3.07715 7.34473H2.78906C2.61328 7.34473 2.55469 7.40332 2.55469 7.5791V7.8623C2.55469 8.03809 2.61328 8.09668 2.78906 8.09668ZM4.36621 8.09668H4.64941C4.83008 8.09668 4.88867 8.03809 4.88867 7.8623V7.5791C4.88867 7.40332 4.83008 7.34473 4.64941 7.34473H4.36621C4.18555 7.34473 4.12695 7.40332 4.12695 7.5791V7.8623C4.12695 8.03809 4.18555 8.09668 4.36621 8.09668ZM5.93848 8.09668H6.22656C6.40234 8.09668 6.46094 8.03809 6.46094 7.8623V7.5791C6.46094 7.40332 6.40234 7.34473 6.22656 7.34473H5.93848C5.7627 7.34473 5.69922 7.40332 5.69922 7.5791V7.8623C5.69922 8.03809 5.7627 8.09668 5.93848 8.09668Z" fill="#333333" />
  </svg>
)

const IconPeople = () => (
  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.51758 4.43555C10.6016 4.43555 11.5 3.47852 11.5 2.25293C11.5 1.06152 10.5918 0.124023 9.51758 0.124023C8.43848 0.124023 7.53027 1.07129 7.53027 2.25781C7.53516 3.47852 8.43359 4.43555 9.51758 4.43555ZM3.85352 4.54297C4.7959 4.54297 5.57715 3.70801 5.57715 2.64355C5.57715 1.60352 4.78613 0.792969 3.85352 0.792969C2.91602 0.792969 2.12012 1.61816 2.125 2.64844C2.125 3.70801 2.90625 4.54297 3.85352 4.54297ZM1.18262 8.99609H4.80566C4.27344 8.24414 4.7959 6.77441 5.93848 5.86621C5.40625 5.5293 4.70801 5.28027 3.84863 5.28027C1.68555 5.28027 0.245117 6.87207 0.245117 8.17578C0.245117 8.69336 0.494141 8.99609 1.18262 8.99609ZM6.49023 8.99609H12.54C13.3701 8.99609 13.6533 8.72754 13.6533 8.26367C13.6533 7.01367 12.0469 5.29492 9.5127 5.29492C6.9834 5.29492 5.37207 7.01367 5.37207 8.26367C5.37207 8.72754 5.65527 8.99609 6.49023 8.99609Z" fill="#333333" />
  </svg>
)

const IconInfo = () => (
  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.97656 10.582C8.77441 10.582 11.0791 8.27734 11.0791 5.47949C11.0791 2.68164 8.76953 0.37207 5.97656 0.37207C3.17871 0.37207 0.874023 2.68164 0.874023 5.47949C0.874023 8.27734 3.17871 10.582 5.97656 10.582ZM5.87402 6.45605C5.5127 6.45605 5.31738 6.2998 5.31738 5.9873V5.93848C5.31738 5.51367 5.57129 5.25 5.93262 5.00586C6.35742 4.71289 6.57227 4.54688 6.57227 4.25391C6.57227 3.95117 6.33789 3.74609 5.98145 3.74609C5.70801 3.74609 5.50781 3.87793 5.35156 4.1123C5.20508 4.27832 5.11719 4.42969 4.80957 4.42969C4.52148 4.42969 4.32129 4.24902 4.32129 3.98535C4.32129 3.8877 4.34082 3.7998 4.375 3.70703C4.53613 3.21387 5.16113 2.83301 6.03516 2.83301C6.98242 2.83301 7.75391 3.3457 7.75391 4.19531C7.75391 4.77148 7.45605 5.05957 6.94336 5.39648C6.63086 5.60156 6.43555 5.77246 6.40625 6.0166C6.40625 6.03613 6.40137 6.05566 6.40137 6.07031C6.3623 6.29004 6.17676 6.45605 5.87402 6.45605ZM5.89844 7.99902C5.53711 7.99902 5.26367 7.76953 5.26367 7.42285C5.26367 7.07617 5.53711 6.84668 5.89844 6.84668C6.25488 6.84668 6.52832 7.07617 6.52832 7.42285C6.52832 7.76953 6.25488 7.99902 5.89844 7.99902Z" fill="#333333" />
  </svg>

)
const EmptyFrame = () => (
  <div>
    <FreeIcon />
    <h1>Free Date!</h1>
    <p>We dont have any reservation for this date. Make your first reservation right now and save the date</p>
    <style>
      {
            `
           .content{
              margin:auto;
              text-align:center;
              color: #3B414B;
              padding-top:8%;
            }
           p{
            font-family: Open Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 25px;
            text-align: center;
            letter-spacing: 0.15px;
            width:70%;
            margin:auto;
           }
           h1{
            font-family: Open Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 36px;
            line-height: 49px;
            text-align: center;
            letter-spacing: 0.15px;
            
           }
  
            `
          }

    </style>
  </div>
)
