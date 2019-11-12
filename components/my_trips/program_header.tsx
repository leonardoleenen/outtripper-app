import React from 'react'
import moment from 'moment'
import { MyTripProgram } from '../../services/type'

interface Props {
  program: MyTripProgram
}

export default (props: Props) => (
  <div className="program_header_container">
    <header>
      <img src={props.program.thumbnail} alt="Header" />
    </header>
    <div className="trip_lodge pl-2 mt-3">
      <p>{props.program.lodge}</p>
      <p className="share_trip">
        <ShareIcon />
        Share this trip
      </p>
    </div>
    <div className="heading-3 pl-2">{props.program.title}</div>
    <div className="subtitle pl-2">{props.program.subtitle}</div>
    <div className="dates pl-2">
      <p>
        From
        <strong>{moment(props.program.from).format('MMM Do')}</strong>
      </p>
      <p>
        to
        <strong>{moment(props.program.to).format('MMM Do')}</strong>
      </p>
    </div>
    <style>
      {
            `
            .program_header_container {
              display: grid;
              grid-template-rows: 4fr 0.5fr 0.5fr 0.5fr 0.5fr;
            }
            .trip_lodge {
              display: grid;
              grid-template-columns: 50% 50%;
            }
            .share_trip {
              font-weight: 600;
              font-size: 12px;
            }
            .share_trip svg {
              display: inline-block;
            }
            .program_header_container .heading-3 {
              font-weight: normal;
              font-size: 24px;
              line-height: 33px;
              letter-spacing: 0.15px;
            }
            .program_header_container .subtitle {
              font-weight: 300;
              font-size: 14px;
              line-height: 25px;
              letter-spacing: 0.15px;
            }
            .program_header_container .dates {
              font-weight: normal;
              font-size: 12px;
              line-height: 16px;
              letter-spacing: 0.15px;
              display: grid;
              grid-template-columns: 30% 30%;
             }
            `
          }
    </style>
  </div>
)

const ShareIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.6983 13.3712C13.11 12.9992 13.6483 12.7617 14.25 12.7617C15.5246 12.7617 16.5617 13.7987 16.5617 15.0733C16.5617 16.3479 15.5246 17.385 14.25 17.385C12.9754 17.385 11.9383 16.3479 11.9383 15.0733C11.9383 14.8992 11.9621 14.725 12.0017 14.5587L6.365 11.2654C5.9375 11.6612 5.37542 11.9067 4.75 11.9067C3.43583 11.9067 2.375 10.8458 2.375 9.53166C2.375 8.21749 3.43583 7.15666 4.75 7.15666C5.37542 7.15666 5.9375 7.40207 6.365 7.79791L11.9462 4.54416C11.9067 4.36207 11.875 4.17999 11.875 3.98999C11.875 2.67582 12.9358 1.61499 14.25 1.61499C15.5642 1.61499 16.625 2.67582 16.625 3.98999C16.625 5.30416 15.5642 6.36499 14.25 6.36499C13.6246 6.36499 13.0625 6.11957 12.635 5.72374L7.05375 8.97749C7.09333 9.15957 7.125 9.34166 7.125 9.53166C7.125 9.72166 7.09333 9.90374 7.05375 10.0858L12.6983 13.3712ZM15.0417 3.98999C15.0417 3.55457 14.6854 3.19832 14.25 3.19832C13.8146 3.19832 13.4583 3.55457 13.4583 3.98999C13.4583 4.42541 13.8146 4.78166 14.25 4.78166C14.6854 4.78166 15.0417 4.42541 15.0417 3.98999ZM4.75 10.3233C4.31458 10.3233 3.95833 9.96707 3.95833 9.53166C3.95833 9.09624 4.31458 8.73999 4.75 8.73999C5.18542 8.73999 5.54167 9.09624 5.54167 9.53166C5.54167 9.96707 5.18542 10.3233 4.75 10.3233ZM13.4583 15.0892C13.4583 15.5246 13.8146 15.8808 14.25 15.8808C14.6854 15.8808 15.0417 15.5246 15.0417 15.0892C15.0417 14.6537 14.6854 14.2975 14.25 14.2975C13.8146 14.2975 13.4583 14.6537 13.4583 15.0892Z" fill="#2B6CB0" />
  </svg>
)
