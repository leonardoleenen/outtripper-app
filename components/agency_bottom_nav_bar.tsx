import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import bs from '../services/business'

export default () => {
  const router = useRouter()
  useEffect(() => {
    bs.getToken().then((result) => {
      console.log(result)
    })
  })

  return (
    <div className="navigationBar  w-full">
      <div className="m-auto ">
        <HomeIcon />
        <p>Home</p>

      </div>
      <Link href="/agency/destinations">
        <div className="m-auto">
          <DestinationsIcon />
          <p>Destinations</p>
        </div>
      </Link>
      <div className="m-auto ">
        <ReservationsIcon />
        <p>Reservations</p>
      </div>

      <div className="m-auto " onClick={() => router.push('/notifications')}>
        <NotificationsIcon />
        <p>Notifications</p>
      </div>

      <div className="m-auto ">
        <GuestsIcon />
        <p>Guests</p>
      </div>
      <div className="m-auto ">
        <MoreIcon />
        <p>More</p>
      </div>


      <style jsx>
        {
          `
           .navigationBar{
             display:grid;
             grid-template-columns:repeat(6, 1fr);
             grid-gap:20px;
             font-family: Open Sans;
             font-style: normal;
             font-weight: 300;
             font-size: 9px;
             text-align:center;
             align-items: center;
             letter-spacing: 0.15px;
             color: #718096;
             bottom:0px;
             position:fixed;
             background:#fff;
             padding-top:8px;
             padding-bottom:8px;
           }
           .m-auto{margin:auto}
           p{margin-top:3px;}
           svg{margin:auto;
          display:block}
           
  
            `
        }

      </style>
    </div>
  )
}


const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M18.9902 20H16.0002V13C16.0002 12.447 15.5522 12 15.0002 12H9.00024C8.44724 12 8.00024 12.447 8.00024 13V20H5.00024L5.00624 11.583L11.9982 4.432L19.0002 11.624L18.9902 20ZM10.0002 20H14.0002V14H10.0002V20ZM20.4242 10.185L12.7152 2.301C12.3382 1.916 11.6622 1.916 11.2852 2.301L3.57524 10.186C3.21024 10.561 3.00024 11.085 3.00024 11.624V20C3.00024 21.103 3.84724 22 4.88824 22H9.00024H15.0002H19.1112C20.1522 22 21.0002 21.103 21.0002 20V11.624C21.0002 11.085 20.7902 10.561 20.4242 10.185Z" fill="#718096" />
    <mask id="maskHome" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="2" width="19" height="20">
      <path fillRule="evenodd" clipRule="evenodd" d="M18.9902 20H16.0002V13C16.0002 12.447 15.5522 12 15.0002 12H9.00024C8.44724 12 8.00024 12.447 8.00024 13V20H5.00024L5.00624 11.583L11.9982 4.432L19.0002 11.624L18.9902 20ZM10.0002 20H14.0002V14H10.0002V20ZM20.4242 10.185L12.7152 2.301C12.3382 1.916 11.6622 1.916 11.2852 2.301L3.57524 10.186C3.21024 10.561 3.00024 11.085 3.00024 11.624V20C3.00024 21.103 3.84724 22 4.88824 22H9.00024H15.0002H19.1112C20.1522 22 21.0002 21.103 21.0002 20V11.624C21.0002 11.085 20.7902 10.561 20.4242 10.185Z" fill="white" />
    </mask>
    <g mask="url(#maskHome)">
      <rect width="24" height="24" fill="#718096" />
    </g>
  </svg>
)
const DestinationsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.48 6.47 2 11.99 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 11.99 22C6.47 22 2 17.52 2 12ZM15.97 8H18.92C17.96 6.35 16.43 5.07 14.59 4.44C15.19 5.55 15.65 6.75 15.97 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4 12C4 12.69 4.1 13.36 4.26 14H7.64C7.56 13.34 7.5 12.68 7.5 12C7.5 11.32 7.56 10.66 7.64 10H4.26C4.1 10.64 4 11.31 4 12ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM5.08 8H8.03C8.35 6.75 8.81 5.55 9.41 4.44C7.57 5.07 6.04 6.34 5.08 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM9.5 12C9.5 12.68 9.57 13.34 9.66 14H14.34C14.43 13.34 14.5 12.68 14.5 12C14.5 11.32 14.43 10.65 14.34 10H9.66C9.57 10.65 9.5 11.32 9.5 12ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.5 12C16.5 12.68 16.44 13.34 16.36 14H19.74C19.9 13.36 20 12.69 20 12C20 11.31 19.9 10.64 19.74 10H16.36C16.44 10.66 16.5 11.32 16.5 12Z" fill="#718096" />
  </svg>
)

const ReservationsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M21 16C20.73 11.93 17.75 8.6 13.84 7.79C13.94 7.55 14 7.28 14 7C14 5.9 13.1 5 12 5C10.9 5 10 5.9 10 7C10 7.28 10.06 7.55 10.16 7.79C6.25 8.6 3.27 11.93 3 16H21ZM18.98 17H2V19H22V17H18.98ZM18.5 13.99C17.47 11.41 14.95 9.58 12 9.58C9.05 9.58 6.53 11.41 5.5 13.99H18.5Z" fill="#718096" />
  </svg>
)
const NotificationsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.5146 16L6.6946 14.818C7.0726 14.44 7.2806 13.938 7.2806 13.404V8.727C7.2806 7.37 7.8706 6.073 8.9006 5.171C9.9386 4.261 11.2606 3.861 12.6376 4.042C14.9646 4.351 16.7196 6.455 16.7196 8.937V13.404C16.7196 13.938 16.9276 14.44 17.3046 14.817L18.4856 16H5.5146ZM13.9996 18.341C13.9996 19.24 13.0836 20 11.9996 20C10.9156 20 9.9996 19.24 9.9996 18.341V18H13.9996V18.341ZM20.5206 15.208L18.7196 13.404V8.937C18.7196 5.456 16.2176 2.499 12.8996 2.06C10.9776 1.804 9.0376 2.391 7.5826 3.667C6.1186 4.949 5.2806 6.793 5.2806 8.727L5.2796 13.404L3.4786 15.208C3.0096 15.678 2.8706 16.377 3.1246 16.99C3.3796 17.604 3.9726 18 4.6366 18H7.9996V18.341C7.9996 20.359 9.7936 22 11.9996 22C14.2056 22 15.9996 20.359 15.9996 18.341V18H19.3626C20.0266 18 20.6186 17.604 20.8726 16.991C21.1276 16.377 20.9896 15.677 20.5206 15.208Z" fill="#718096" />
    <mask id="maskNotifications" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="19" height="20">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.5146 16L6.6946 14.818C7.0726 14.44 7.2806 13.938 7.2806 13.404V8.727C7.2806 7.37 7.8706 6.073 8.9006 5.171C9.9386 4.261 11.2606 3.861 12.6376 4.042C14.9646 4.351 16.7196 6.455 16.7196 8.937V13.404C16.7196 13.938 16.9276 14.44 17.3046 14.817L18.4856 16H5.5146ZM13.9996 18.341C13.9996 19.24 13.0836 20 11.9996 20C10.9156 20 9.9996 19.24 9.9996 18.341V18H13.9996V18.341ZM20.5206 15.208L18.7196 13.404V8.937C18.7196 5.456 16.2176 2.499 12.8996 2.06C10.9776 1.804 9.0376 2.391 7.5826 3.667C6.1186 4.949 5.2806 6.793 5.2806 8.727L5.2796 13.404L3.4786 15.208C3.0096 15.678 2.8706 16.377 3.1246 16.99C3.3796 17.604 3.9726 18 4.6366 18H7.9996V18.341C7.9996 20.359 9.7936 22 11.9996 22C14.2056 22 15.9996 20.359 15.9996 18.341V18H19.3626C20.0266 18 20.6186 17.604 20.8726 16.991C21.1276 16.377 20.9896 15.677 20.5206 15.208Z" fill="white" />
    </mask>
    <g mask="url(#maskNotifications)">
      <rect width="24" height="24" fill="#718096" />
    </g>
  </svg>

)

const GuestsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM14 8C14 6.9 13.1 6 12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8ZM18 18C17.8 17.29 14.7 16 12 16C9.31 16 6.23 17.28 6 18H18ZM4 18C4 15.34 9.33 14 12 14C14.67 14 20 15.34 20 18V20H4V18Z" fill="#718096" />
  </svg>
)

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 10.896 3.896 10 5 10C6.104 10 7 10.896 7 12C7 13.104 6.104 14 5 14C3.896 14 3 13.104 3 12ZM12 10C10.896 10 10 10.896 10 12C10 13.104 10.896 14 12 14C13.104 14 14 13.104 14 12C14 10.896 13.104 10 12 10ZM19 10C17.896 10 17 10.896 17 12C17 13.104 17.896 14 19 14C20.104 14 21 13.104 21 12C21 10.896 20.104 10 19 10Z" fill="#718096" />
    <mask id="maskMore" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="10" width="18" height="4">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 10.896 3.896 10 5 10C6.104 10 7 10.896 7 12C7 13.104 6.104 14 5 14C3.896 14 3 13.104 3 12ZM12 10C10.896 10 10 10.896 10 12C10 13.104 10.896 14 12 14C13.104 14 14 13.104 14 12C14 10.896 13.104 10 12 10ZM19 10C17.896 10 17 10.896 17 12C17 13.104 17.896 14 19 14C20.104 14 21 13.104 21 12C21 10.896 20.104 10 19 10Z" fill="white" />
    </mask>
    <g mask="url(#maskMore)">
      <rect width="24" height="24" fill="#718096" />
    </g>
  </svg>
)
