import React from 'react'
import moment from 'moment'

export interface TransferData {
  code: string
  type: string
  from: string
  to: string
  pickupTime: string
  driver?: Driver
}

export interface Driver {
  firstname: string
  lastname: string
  photo: string
  phone: string
  live: string
}

interface Props {
  transferData: TransferData
}

export default (props: Props) => (
  <div className="ground_transfer_main_container m-2 rounded-b-lg">
    <header className="card_ground_head bg-gray-300 rounded-t-lg pl-3">
      <AirportShuttle />
      <p>Ground Transfer</p>
    </header>
    <article className="ground_transfer_data bg-gray-100 rounded-b-lg">
      <div className="mt-5 ml-3">
        <img src={props.transfer_data.driver.photo} alt="Driver photo" />
        <p className="driver_name">
          {props.transferData.driver.firstname}
          {props.transferData.driver.lastname}
        </p>
      </div>
      <div className="article-column">
        <p>
          From:
          {props.transferData.from}
        </p>
        <p>
          To:
          {props.transferData.to}
        </p>
        <p className="pickup_time">
          Pickup Time:
          {moment(props.transferData.pickupTime).format('h:mm a')}
        </p>
      </div>
    </article>
    <article className="ground_transfer_contact pt-2">
      <div className="ml-10">
        <Location />
        live location
      </div>
      <div className="ml-10">
        <PhoneLink />
        call to
        {' '}
        {props.transferData.driver.firstname}
      </div>
    </article>
    <style>
      {
        `
        header.card_ground_head {
          display: grid;
          grid-template-columns: 10% 90%;
        }
        .ground_transfer_main_container {
          display: grid;
          grid-template-rows: 27px 4fr 39px;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
        article.ground_transfer_data {
          display: grid;
          grid-template-columns: 30% 70%;
        }
        .ground_transfer_data .article-column {
          display: grid;
          grid-template-rows:1fr 2fr 1fr;
        }
        .article-column .pickup_time {
          font-size: 14px;
          line-height: 25px;
          letter-spacing: 0.15px;
          color: #718096;
        }
        .ground_transfer_contact {
          display: grid;
          grid-template-columns: 50% 50%;
        }
        .ground_transfer_contact svg {
          display: inline-block;
        }
        .ground_transfer_data .driver_name {
          font-weight: 300;
          font-size: 9px;
          line-height: 12px;
          letter-spacing: 0.15px;
          color: #3B414B;
        }
        `
      }
    </style>
  </div>
)

const AirportShuttle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/places/airport_shuttle_24px">
      <path id="icon/places/airport_shuttle_24px_2" fillRule="evenodd" clipRule="evenodd" d="M17 5H3C1.9 5 1 5.89 1 7V16H3C3 17.66 4.34 19 6 19C7.66 19 9 17.66 9 16H15C15 17.66 16.34 19 18 19C19.66 19 21 17.66 21 16H23V11L17 5ZM15 7H16L19 10H15V7ZM13 7H9V10H13V7ZM3 7H7V10H3V7ZM4.75 16C4.75 16.69 5.31 17.25 6 17.25C6.69 17.25 7.25 16.69 7.25 16C7.25 15.31 6.69 14.75 6 14.75C5.31 14.75 4.75 15.31 4.75 16ZM18 17.25C17.31 17.25 16.75 16.69 16.75 16C16.75 15.31 17.31 14.75 18 14.75C18.69 14.75 19.25 15.31 19.25 16C19.25 16.69 18.69 17.25 18 17.25ZM20.22 14H21V12H3V14H3.78C4.33 13.39 5.11 13 6 13C6.89 13 7.67 13.39 8.22 14H15.78C16.33 13.39 17.12 13 18 13C18.88 13 19.67 13.39 20.22 14Z" fill="#718096" />
    </g>
  </svg>
)

const Location = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/communication/location_on_24px">
      <path id="icon/communication/location_on_24px_2" fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9ZM9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C12.8932 6.5 13.7185 6.9765 14.1651 7.75C14.6116 8.5235 14.6116 9.4765 14.1651 10.25C13.7185 11.0235 12.8932 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9Z" fill="#4299E1" />
    </g>
  </svg>
)

const PhoneLink = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/communication/phonelink_ring_24px">
      <path id="icon/communication/phonelink_ring_24px_2" fillRule="evenodd" clipRule="evenodd" d="M14.0117 1H4.01172C2.91172 1 2.01172 1.9 2.01172 3V21C2.01172 22.1 2.91172 23 4.01172 23H14.0117C15.1117 23 16.0117 22.1 16.0117 21V3C16.0117 1.9 15.1117 1 14.0117 1ZM19.1117 8.7L20.1117 7.7C22.6117 10.1 22.6117 13.9 20.1117 16.2L19.1117 15.2C20.9117 13.3 20.9117 10.5 19.1117 8.7ZM17.0117 10.8L18.0117 9.8C19.2117 11.1 19.2117 12.9 18.0117 14.1L17.0117 13.1C17.5117 12.4 17.5117 11.5 17.0117 10.8ZM4.01172 20H14.0117V4H4.01172V20Z" fill="#4299E1" />
    </g>
  </svg>
)
