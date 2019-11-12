import React from 'react'
import moment from 'moment'

export interface FlightData {
  code: string
  type: string
  flightNumber?: string
  flightStatus?: string
  flightGate?: string
  departureData?: FlightDataDetail
  arrivalData?: FlightDataDetail
}

interface Props {
  label: string
  flightData: FlightData
}

interface FlightDataDetail {
  airportCode: string
  time?: string
}

export default (props: Props) => {
  if (props.flightData.type == 'flight') {
    return (
      <div className="main_container m-2 rounded-b-lg">
        <header className="card_flight_head bg-gray-300 rounded-t-lg">
          <SmallPlaneVertical />
          <p>{props.label}</p>
        </header>
        <div className="bg-gray-100"><p>{props.flightData.flightNumber}</p></div>
        <article className="flights_data bg-gray-100 rounded-b-lg">
          <div className="article-column">
            <p>Departure</p>
            <p>{props.flightData.departure_data.airportCode}</p>
            <p>{moment(props.flightData.departureData.time).format('h:mm a')}</p>
          </div>
          <div className="article-column">
            <p>On time</p>
            <SmallPlaneHorizonatal status="ontime" />
            <p>{props.flightData.flightStatus}</p>
          </div>
          <div className="article-column">
            <p>Arrival</p>
            <p>{props.flightData.arrivalData.airportCode}</p>
            <p>{moment(props.flightData.arrivalData.time).format('h:mm a')}</p>
          </div>
        </article>
        <style>
          {
          `
                      header.card_flight_head {
                        display: grid;
                        grid-template-columns: 10% 90%;
                      }
                      .main_container {
                        display: grid;
                        grid-template-rows: 27px 27px 4fr;
                        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                      }
                      article.flights_data {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                      }
                      .flights_data .article-column {
                        display: grid;
                        grid-template-rows:1fr 3fr 1fr;
                      }
                      `
        }
        </style>
      </div>
    )
  }
  return <div />
}


const SmallPlaneVertical = () => (
  <svg style={{ margin: 'auto' }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/maps/flight_24px">
      <path id="icon/maps/flight_24px_2" d="M21.5 16V14L13.5 9V3.5C13.5 2.67 12.83 2 12 2C11.17 2 10.5 2.67 10.5 3.5V9L2.5 14V16L10.5 13.5V19L8.5 20.5V22L12 21L15.5 22V20.5L13.5 19V13.5L21.5 16Z" fill="#718096" />
    </g>
  </svg>
)

interface PlaneIconData {
  status: string
}

const SmallPlaneHorizonatal = (planeIconData: PlaneIconData) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/device/airplanemode_active_24px">
      <path id="icon/device/airplanemode_active_24px_2" d="M8 21.5H10L15 13.5L20.5 13.5C21.33 13.5 22 12.83 22 12C22 11.17 21.33 10.5 20.5 10.5H15L10 2.5H8L10.5 10.5L5 10.5L3.5 8.5H2L3 12L2 15.5H3.5L5 13.5L10.5 13.5L8 21.5Z" fill={planeIconData.status === 'delayed' ? '#E53E3E' : '#68D391'} />
    </g>
  </svg>
)
