/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import lunr from 'lunr'
import BottomNavBar from '../components/bottom_nav_bar'
import Loading from '../components/loading'
import bs from '../services/business'
import '../statics/style/style.scss'
import { IconSearch } from '../statics/icons'

let reservationIndex = null
let reservationFiltered = []

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
  }

  return (
    <div className="content relative h-screen">
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
        reservationFiltered.map((r: Reservation) => (
          <div key={r.id} className="flex relative w-full border-b rounded-lg  p-4 mt-4" onClick={() => router.push(`/reservation/voucher?id=${r.id}`)}>
            <div className="w-2/4">
              <div className="flex items-center">
                <div className="text-xl">{`${r.reservationHolder.lastName}, ${r.reservationHolder.firstName}`}</div>
                {r.isOnHold ? <div className="flex  items-center justify-end h-5"><span className="font-thin text-xs rounded-lg bg-yellow-300 px-2 mx-2"> On Hold</span></div> : ''}
              </div>
              <div className="font-thin text-xs">Full Week program </div>
              <div className="font-thin text-xs">{`${r.pax.length} ${r.reservationLabel}`}</div>
              <div className="font-thin text-xs">{`#${r.id} - ${moment(r.reservedAt).format('DD MMM YYYY')}`}</div>

            </div>
            { (r.amountOfPurchase - r.amountOfPayment) > 0 ? (
              <div className="w-2/4 flex-cols ">
                <div className="flex justify-end text-xl"><span>{formatter.format(bs.getNextInstallmentInDueDate(r).amount)}</span></div>
                <div className="flex justify-end">
                  <div className="w-full flex justify-end h-5"><span className={`font-thin text-xs px-2 rounded-lg ${bs.getDiffDaysForInstallmentNextDue(r) < 0 ? 'bg-red-200' : 'bg-green-200'}`}>{bs.getDiffDaysForInstallmentNextDue(r) < 0 ? `Overdue ${bs.getDiffDaysForInstallmentNextDue(r) * -1} days` : `Due in ${bs.getDiffDaysForInstallmentNextDue(r)} days`}</span></div>
                </div>
                <div className="flex justify-end"><span className="font-thin text-xs">{`Installments ${bs.getNextInstallmentInDueDate(r).order} / ${r.invoicesObject[0].installments.length}`}</span></div>
                <div className="flex justify-end">
                  <div className="inline-block align-bottom">
                    <span className="font-thin text-xs">Balance  </span>
                    <span className="text-xl">{`${formatter.format(r.amountOfPurchase - r.amountOfPayment)}`}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-2/4 flex-cols ">
                <div className="flex justify-end text-xl">
                  <span>{formatter.format(r.amountOfPurchase)}</span>
                </div>
                <div className="flex items-center justify-end">
                  <div><IconDeposited /></div>
                  <div className="ml-2"><span className="text-xl text-green-500">Deposited</span></div>
                </div>
              </div>

            )}

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

const IconPeople = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.625 7.5C6.83125 7.5 7.8125 6.51875 7.8125 5.3125C7.8125 4.10625 6.83125 3.125 5.625 3.125C4.41875 3.125 3.4375 4.10625 3.4375 5.3125C3.4375 6.51875 4.41875 7.5 5.625 7.5ZM1.25 10.7812C1.25 9.325 4.1625 8.59375 5.625 8.59375C7.0875 8.59375 10 9.325 10 10.7812V11.875H1.25V10.7812ZM5.62497 9.84375C4.50622 9.84375 3.23747 10.2625 2.71247 10.625H8.53747C8.01247 10.2625 6.74372 9.84375 5.62497 9.84375ZM6.5625 5.3125C6.5625 4.79375 6.14375 4.375 5.625 4.375C5.10625 4.375 4.6875 4.79375 4.6875 5.3125C4.6875 5.83125 5.10625 6.25 5.625 6.25C6.14375 6.25 6.5625 5.83125 6.5625 5.3125ZM10.025 8.63178C10.75 9.15678 11.25 9.85678 11.25 10.7818V11.8755H13.75V10.7818C13.75 9.51928 11.5625 8.80053 10.025 8.63178ZM11.5625 5.3125C11.5625 6.51875 10.5813 7.5 9.375 7.5C9.0375 7.5 8.725 7.41875 8.4375 7.28125C8.83125 6.725 9.0625 6.04375 9.0625 5.3125C9.0625 4.58125 8.83125 3.9 8.4375 3.34375C8.725 3.20625 9.0375 3.125 9.375 3.125C10.5813 3.125 11.5625 4.10625 11.5625 5.3125Z" fill="black" fillOpacity="0.54" />
  </svg>
)

const IconDeposited = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.41675 8.5013C1.41675 4.60547 4.60425 1.41797 8.50008 1.41797C12.3959 1.41797 15.5834 4.60547 15.5834 8.5013C15.5834 12.3971 12.3959 15.5846 8.50008 15.5846C4.60425 15.5846 1.41675 12.3971 1.41675 8.5013ZM2.83341 8.5013C2.83341 11.6251 5.37633 14.168 8.50008 14.168C11.6238 14.168 14.1667 11.6251 14.1667 8.5013C14.1667 5.37755 11.6238 2.83464 8.50008 2.83464C5.37633 2.83464 2.83341 5.37755 2.83341 8.5013ZM12.0417 10.6263V12.043H4.95841V10.6263H12.0417ZM5.95008 6.5888L7.29591 7.93463L11.0501 4.18047L12.0417 5.17213L7.29591 9.91797L4.95841 7.58047L5.95008 6.5888Z" fill="#6FC28B" />
  </svg>
)


const EmptyFrame = () => (
  <div>
    <FreeIcon />
    <h1>Free Date!</h1>
    <p>We dont have any reservation for this date. Make your first reservation right now and save the date</p>
    <style jsx>
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
