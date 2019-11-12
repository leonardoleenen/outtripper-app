import React from 'react'

export interface LodgeActivitiesData {
  code: string
  type: string
  text: string
  serviceIncluded?: Array<string>
}


interface Props {
  lodgeActivitiesData: LodgeActivitiesData
}

export default (props: Props) => (
  <div className="flight_charter_main_container m-2 rounded-b-lg">
    <header className="flight_charter_head bg-gray-300 rounded-t-lg pl-3">
      <AdventurePerson />
      <p>Lodge Activities </p>
    </header>
    <article className="bg-gray-100 rounded-b-lg">
      <ul className="p-5">
        {props.lodgeActivitiesData.serviceIncluded.map((item: any) => <li key={item}>{item}</li>)}
      </ul>
    </article>
    <style>
      {
        `
        header.flight_charter_head {
          display: grid;
          grid-template-columns: 10% 90%;
        }
        .flight_charter_main_container {
          display: grid;
          grid-template-rows: 27px 90%;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
        .flight_charter_main_container li {
          font-weight: normal;
          font-size: 14px;
          line-height: 25px;
          letter-spacing: 0.15px;
        }
        `
      }
    </style>
  </div>
)

const AdventurePerson = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/action/rowing_24px">
      <path id="icon/action/rowing_24px_2" fillRule="evenodd" clipRule="evenodd" d="M14.5 0.5C13.4 0.5 12.5 1.4 12.5 2.5C12.5 3.6 13.4 4.5 14.5 4.5C15.6 4.5 16.5 3.6 16.5 2.5C16.5 1.4 15.6 0.5 14.5 0.5ZM8 14L3.5 18.5L5 20L8.5 16.5H10.5L8 14ZM17.5 23.5L20.5 20.51L17.5 17.5H16L9.71 11.21C10.57 10.84 11.37 10.34 12 9.82V12.09L15.58 15.67C16.15 15.12 16.5 14.35 16.5 13.51V7.76C16.5 6.52 15.49 5.51 14.25 5.5H14.22C13.88 5.5 13.55 5.59 13.26 5.73C13 5.85 12.76 6.02 12.57 6.23L11.17 7.78C10.11 8.95 8.16 9.85 6.5 9.82V11.98C6.8 11.98 7.1 11.96 7.41 11.91L14.51 19V20.49L17.5 23.5Z" fill="#718096" />
    </g>
  </svg>
)
