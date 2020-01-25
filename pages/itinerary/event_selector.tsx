import React, { useState } from 'react'
import { ITINERARY_EVENT } from '../../services/business'

export default () => {
  const [eventSelected, setEventSelected] = useState()

  return (
    <div className="main h-screen ">
      <header className="p-4 flex items-center">
        <div><IconBack /></div>
        <div className="ml-4 font-thin text-xl"><span>Select an item to add</span></div>
      </header>
      <article className="font-thin">
        <div onClick={() => setEventSelected(ITINERARY_EVENT.CHARTERFLIGHT)} className="ripple p-4 border-r border-white border-b ml-4">
          {eventSelected === ITINERARY_EVENT.CHARTERFLIGHT ? <Spinner /> : <IconCharterFlight />}
          <div className="flex justify-center"><span>Charter Flight</span></div>
        </div>
        <div onClick={() => setEventSelected(ITINERARY_EVENT.GROUNDTRANSFER)} className="p-4 border-b mr-4">
          {eventSelected === ITINERARY_EVENT.GROUNDTRANSFER ? <Spinner /> : <IconGroundTransfer />}
          <div className="flex justify-center"><span>Ground Transfer</span></div>
        </div>
        <div onClick={() => setEventSelected(ITINERARY_EVENT.COMERCIALFLIGHT)} className="p-4  border-r border-white border-b ml-4">
          {eventSelected === ITINERARY_EVENT.COMERCIALFLIGHT ? <Spinner /> : <IconComercialFlight />}
          <div className="flex justify-center"><span>Comercial Flight</span></div>
        </div>
        <div onClick={() => setEventSelected(ITINERARY_EVENT.RESTAURANT)} className="p-4 border-b mr-4">
          {eventSelected === ITINERARY_EVENT.RESTAURANT ? <Spinner /> : <IconRestaurant />}
          <div className="flex justify-center"><span>Restaurants</span></div>
        </div>
        <div onClick={() => setEventSelected(ITINERARY_EVENT.GENERAL_ACTIVITIE)} className="p-4  border-r border-white border-b ml-4">
          {eventSelected === ITINERARY_EVENT.GENERAL_ACTIVITIE ? <Spinner /> : <IconActivities />}
          <div className="flex justify-center"><span>Activities</span></div>
        </div>
        <div onClick={() => setEventSelected(ITINERARY_EVENT.RENTAL_CAR)} className="p-4 border-b mr-4">
          {eventSelected === ITINERARY_EVENT.RENTAL_CAR ? <Spinner /> : <IconCar />}
          <div className="flex justify-center"><span>Rental Car</span></div>
        </div>
        <div onClick={() => setEventSelected(ITINERARY_EVENT.ATTRACTION)} className="p-4  border-r border-white  ml-4">
          {eventSelected === ITINERARY_EVENT.ATTRACTION ? <Spinner /> : <IconMovie />}
          <div className="flex justify-center"><span>Attraction</span></div>
        </div>
        <div onClick={() => setEventSelected(ITINERARY_EVENT.HOTEL)} className="p-4 mr-4 ">
          {eventSelected === ITINERARY_EVENT.HOTEL ? <Spinner /> : <IconHotel />}
          <div className="flex justify-center"><span>Hotel</span></div>
        </div>
      </article>
      <style>
        {`
        .main {
          background: linear-gradient(180deg, #549495 25.52%, #386571 61.98%);
          color: white
        }
        article {
          display: grid;
          grid-template-columns: 1fr 1fr;
        } 
      `}
      </style>
    </div>
  )
}

const IconCharterFlight = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M70.5997 50.9654C69.8664 53.632 67.133 55.1987 64.4664 54.4987L9.23305 39.6987V22.4654L14.0664 23.7654L17.1664 31.4987L33.7331 35.932V8.33203L40.1664 10.032L49.3664 40.0987L67.0664 44.832C69.7331 45.5654 71.2997 48.2987 70.5997 50.9654ZM71.6663 64.9987H8.33301V71.6654H71.6663V64.9987Z" fill="white" />
  </svg>

)

const IconComercialFlight = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M70.5997 50.9654C69.8664 53.632 67.133 55.1987 64.4664 54.4987L9.23305 39.6987V22.4654L14.0664 23.7654L17.1664 31.4987L33.7331 35.932V8.33203L40.1664 10.032L49.3664 40.0987L67.0664 44.832C69.7331 45.5654 71.2997 48.2987 70.5997 50.9654ZM71.6663 64.9987H8.33301V71.6654H71.6663V64.9987Z" fill="white" />
  </svg>

)
const IconCar = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M63.0667 16.6987C62.4 14.732 60.5333 13.332 58.3333 13.332H21.6667C19.4667 13.332 17.6333 14.732 16.9333 16.6987L10 36.6654V63.332C10 65.1654 11.5 66.6654 13.3333 66.6654H16.6667C18.5 66.6654 20 65.1654 20 63.332V59.9987H60V63.332C60 65.1654 61.5 66.6654 63.3333 66.6654H66.6667C68.5 66.6654 70 65.1654 70 63.332V36.6654L63.0667 16.6987ZM22.8334 19.9987H57.1334L60.7334 30.3654H19.2334L22.8334 19.9987ZM16.6667 53.332H63.3333V36.6654H16.6667V53.332ZM25 39.9987C22.2386 39.9987 20 42.2373 20 44.9987C20 47.7601 22.2386 49.9987 25 49.9987C27.7614 49.9987 30 47.7601 30 44.9987C30 42.2373 27.7614 39.9987 25 39.9987ZM50 44.9987C50 42.2373 52.2386 39.9987 55 39.9987C57.7614 39.9987 60 42.2373 60 44.9987C60 47.7601 57.7614 49.9987 55 49.9987C52.2386 49.9987 50 47.7601 50 44.9987Z" fill="white" />
  </svg>

)

const IconHotel = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M63.333 21.6667H36.6663V48.3333H9.99967V15H3.33301V65H9.99967V55H69.9997V65H76.6663V35C76.6663 27.6333 70.6997 21.6667 63.333 21.6667ZM33.333 35C33.333 40.5333 28.8663 45 23.333 45C17.7997 45 13.333 40.5333 13.333 35C13.333 29.4667 17.7997 25 23.333 25C28.8663 25 33.333 29.4667 33.333 35ZM26.6663 35C26.6663 33.1667 25.1663 31.6667 23.333 31.6667C21.4997 31.6667 19.9997 33.1667 19.9997 35C19.9997 36.8333 21.4997 38.3333 23.333 38.3333C25.1663 38.3333 26.6663 36.8333 26.6663 35ZM43.333 48.3333H69.9997V35C69.9997 31.3333 66.9997 28.3333 63.333 28.3333H43.333V48.3333Z" fill="white" />
  </svg>

)

const IconMovie = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M73.3337 33.332V19.9987C73.3337 16.332 70.3337 13.332 66.667 13.332H13.3337C9.66699 13.332 6.70033 16.332 6.70033 19.9987V33.332C10.367 33.332 13.3337 36.332 13.3337 39.9987C13.3337 43.6654 10.367 46.6654 6.66699 46.6654V59.9987C6.66699 63.6654 9.66699 66.6654 13.3337 66.6654H66.667C70.3337 66.6654 73.3337 63.6654 73.3337 59.9987V46.6654C69.667 46.6654 66.667 43.6654 66.667 39.9987C66.667 36.332 69.667 33.332 73.3337 33.332ZM66.667 28.4654C62.7003 30.7654 60.0003 35.0987 60.0003 39.9987C60.0003 44.8987 62.7003 49.232 66.667 51.532V59.9987H13.3337V51.532C17.3003 49.232 20.0003 44.8987 20.0003 39.9987C20.0003 35.0654 17.3337 30.7654 13.367 28.4654L13.3337 19.9987H66.667V28.4654ZM40.0003 47.0654L30.2337 53.332L33.167 42.0987L24.2003 34.7654L35.767 34.0654L40.0003 23.332L44.2003 34.0987L55.767 34.7987L46.8003 42.132L49.767 53.332L40.0003 47.0654Z" fill="white" />
  </svg>

)

const IconActivities = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M53.3333 17.4154C53.3333 24.782 47.3667 30.7487 40 30.7487C32.6333 30.7487 26.6667 24.782 26.6667 17.4154C26.6667 10.0487 32.6333 4.08203 40 4.08203C47.3667 4.08203 53.3333 10.0487 53.3333 17.4154ZM46.6667 17.4154C46.6667 13.7487 43.6667 10.7487 40 10.7487C36.3333 10.7487 33.3333 13.7487 33.3333 17.4154C33.3333 21.0821 36.3333 24.0821 40 24.0821C43.6667 24.0821 46.6667 21.0821 46.6667 17.4154ZM40 39.2487C32.1333 31.9153 21.6 27.4153 10 27.4153V64.082C21.6 64.082 32.1333 68.582 40 75.9153C47.8667 68.6153 58.4 64.082 70 64.082V27.4153C58.4 27.4153 47.8667 31.9153 40 39.2487ZM40 67.2487C46.9 62.182 54.9 58.982 63.3333 57.8487V34.682C56.3333 35.9487 49.8333 39.182 44.5333 44.1153L40 48.3487L35.4667 44.082C30.1667 39.1487 23.6667 35.9153 16.6667 34.6487V57.8153C25.1 58.9487 33.1333 62.182 40 67.2487Z" fill="white" />
  </svg>

)

const IconRestaurant = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M53.3333 17.4154C53.3333 24.782 47.3667 30.7487 40 30.7487C32.6333 30.7487 26.6667 24.782 26.6667 17.4154C26.6667 10.0487 32.6333 4.08203 40 4.08203C47.3667 4.08203 53.3333 10.0487 53.3333 17.4154ZM46.6667 17.4154C46.6667 13.7487 43.6667 10.7487 40 10.7487C36.3333 10.7487 33.3333 13.7487 33.3333 17.4154C33.3333 21.0821 36.3333 24.0821 40 24.0821C43.6667 24.0821 46.6667 21.0821 46.6667 17.4154ZM40 39.2487C32.1333 31.9153 21.6 27.4153 10 27.4153V64.082C21.6 64.082 32.1333 68.582 40 75.9153C47.8667 68.6153 58.4 64.082 70 64.082V27.4153C58.4 27.4153 47.8667 31.9153 40 39.2487ZM40 67.2487C46.9 62.182 54.9 58.982 63.3333 57.8487V34.682C56.3333 35.9487 49.8333 39.182 44.5333 44.1153L40 48.3487L35.4667 44.082C30.1667 39.1487 23.6667 35.9153 16.6667 34.6487V57.8153C25.1 58.9487 33.1333 62.182 40 67.2487Z" fill="white" />
  </svg>

)

const IconBack = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.8287 18.9995C13.5367 18.9995 13.2467 18.8725 13.0487 18.6265L8.22066 12.6265C7.92266 12.2555 7.92666 11.7255 8.23166 11.3595L13.2317 5.3595C13.5847 4.9355 14.2157 4.8785 14.6407 5.2315C15.0647 5.5845 15.1217 6.2155 14.7677 6.6395L10.2927 12.0105L14.6077 17.3725C14.9537 17.8025 14.8857 18.4325 14.4547 18.7785C14.2707 18.9275 14.0487 18.9995 13.8287 18.9995Z" fill="white" />
    <mask id="mask0Back" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="5" width="7" height="14">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.8287 18.9995C13.5367 18.9995 13.2467 18.8725 13.0487 18.6265L8.22066 12.6265C7.92266 12.2555 7.92666 11.7255 8.23166 11.3595L13.2317 5.3595C13.5847 4.9355 14.2157 4.8785 14.6407 5.2315C15.0647 5.5845 15.1217 6.2155 14.7677 6.6395L10.2927 12.0105L14.6077 17.3725C14.9537 17.8025 14.8857 18.4325 14.4547 18.7785C14.2707 18.9275 14.0487 18.9995 13.8287 18.9995Z" fill="white" />
    </mask>
    <g mask="url(#mask0Back)">
      <rect width="24" height="24" fill="white" />
    </g>
  </svg>

)

const IconGroundTransfer = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M56.6663 16.668H9.99967C6.33301 16.668 3.33301 19.6346 3.33301 23.3346V53.3346H9.99967C9.99967 58.868 14.4663 63.3346 19.9997 63.3346C25.533 63.3346 29.9997 58.868 29.9997 53.3346H49.9997C49.9997 58.868 54.4663 63.3346 59.9997 63.3346C65.533 63.3346 69.9997 58.868 69.9997 53.3346H76.6663V36.668L56.6663 16.668ZM49.9997 23.3346H53.333L63.333 33.3346H49.9997V23.3346ZM43.333 23.3346H29.9997V33.3346H43.333V23.3346ZM9.99967 23.3346H23.333V33.3346H9.99967V23.3346ZM15.833 53.3346C15.833 55.6346 17.6997 57.5013 19.9997 57.5013C22.2997 57.5013 24.1663 55.6346 24.1663 53.3346C24.1663 51.0346 22.2997 49.168 19.9997 49.168C17.6997 49.168 15.833 51.0346 15.833 53.3346ZM59.9997 57.5013C57.6997 57.5013 55.833 55.6346 55.833 53.3346C55.833 51.0346 57.6997 49.168 59.9997 49.168C62.2997 49.168 64.1663 51.0346 64.1663 53.3346C64.1663 55.6346 62.2997 57.5013 59.9997 57.5013ZM67.3997 46.668H69.9997V40.0013H9.99967V46.668H12.5997C14.433 44.6346 17.033 43.3346 19.9997 43.3346C22.9663 43.3346 25.5663 44.6346 27.3997 46.668H52.5997C54.433 44.6346 57.0663 43.3346 59.9997 43.3346C62.933 43.3346 65.5663 44.6346 67.3997 46.668Z" fill="white" />
  </svg>

)

const Spinner = () => (

  <svg
    style={{
      margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto',
    }}
    width="80"
    height="80"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g transform="rotate(0 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(30 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(60 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(90 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(120 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(150 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(180 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(210 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(240 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(270 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(300 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite" />
      </rect>
    </g>
    <g transform="rotate(330 50 50)">
      <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="white">
        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
      </rect>
    </g>
  </svg>
)
