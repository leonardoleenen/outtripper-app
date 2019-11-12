import React, { useState, useEffect } from 'react'
import { businessService } from '../../../services/index'
import ProgramHeader from '../../../components/my_trips/program_header'
import NavBar from '../../../components/my_trips/nav_bar'
import PreTripInfo from '../../../components/my_trips/pre_trip_info'
import Loading from '../../../components/Loading'
import BottomBar from '../../../components/my_trips/bottom_bar'

export default () => {
  const bs = businessService
  const [program, setProgram] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const resolve = await bs.getClientTrip(null)
      setProgram(resolve[0].program)
    }
    fetchData()
  }, [])

  if (program.length === 0) return <Loading />

  return (
    <div className="contact">
      <ProgramHeader program={program} />
      <NavBar />
      <PreTripInfo />
      <header>
        <div className="ml-5 mt-5 title">Do you have a inquiry?</div>
        <div className="ml-5 mt-3 subtitle">Select one of the options and we wil help you</div>
      </header>
      <article className="contact_body ml-5 mt-5">
        <div className="mt-1">
          <Globe />
          Do you  have internet connection?
          <a href="/call">Call free</a>
        </div>
        <div className="mt-1">
          <Phone />
          From USA
          <a href="/callFromUsa">0801 811 7888</a>
        </div>
        <div className="mt-1">
          <Phone />
          From the rest of the world
          <a href="callFromWorld">+1 788 112 2445</a>
        </div>
      </article>
      <BottomBar />
      <style>
        {
                `
                .contact header {
                  display: grid;
                  grid-template-rows: 50% 50%;
                }
                .contact header .title {
                  font-weight: normal;
                  font-size: 24px;
                  line-height: 33px;
                  letter-spacing: 0.15px;
                }
                .contact header .subtitle {
                  font-weight: 300;
                  font-size: 14px;
                  line-height: 25px;
                }
                .contact article.contact_body {
                  display: grid;
                  grid-template-rows: 1fr 1fr 1fr;
                  font-weight: 300;
                  font-size: 14px;
                  line-height: 25px;
                }
                .contact article.contact_body svg {
                  display: inline-block;
                }
                .contact article.contact_body a {
                  font-weight: bold;
                  font-size: 14px;
                  line-height: 25px;
                  letter-spacing: 0.15px;
                  color: #4299E1;
                }
                `
            }
      </style>
    </div>
  )
}

const Globe = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M16.889 18.3184C16.717 17.8854 16.473 17.5074 16.259 17.1844C16.151 17.0224 16.04 16.8574 15.943 16.6874C15.554 16.0114 15.688 15.7374 16.319 14.6804L16.421 14.5074C16.932 13.6464 16.96 12.8204 16.986 12.0924C16.998 11.7344 17.01 11.3974 17.079 11.0804C17.24 10.3484 18.787 10.1534 19.746 10.0384C19.907 10.6674 20 11.3224 20 12.0004C20 14.5694 18.778 16.8534 16.889 18.3184ZM12 4.00037C12.616 4.00037 13.211 4.07637 13.787 4.20837C13.618 4.58037 13.357 4.91937 13.013 5.18837C12.795 5.36037 12.55 5.50337 12.307 5.64837C11.656 6.03637 10.919 6.47637 10.457 7.32237C9.841 8.45237 9.841 9.60637 9.841 10.6244C9.841 11.9794 9.797 12.7804 8.893 13.4874C7.524 14.5604 5.429 13.9614 4.133 13.4164C4.051 12.9554 4 12.4834 4 12.0004C4 7.58937 7.589 4.00037 12 4.00037ZM12 2.00037C6.486 2.00037 2 6.48637 2 12.0004C2 17.5134 6.486 22.0004 12 22.0004C17.514 22.0004 22 17.5134 22 12.0004C22 6.48637 17.514 2.00037 12 2.00037Z" fill="#718096" />
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="21">
      <path fillRule="evenodd" clipRule="evenodd" d="M16.889 18.3184C16.717 17.8854 16.473 17.5074 16.259 17.1844C16.151 17.0224 16.04 16.8574 15.943 16.6874C15.554 16.0114 15.688 15.7374 16.319 14.6804L16.421 14.5074C16.932 13.6464 16.96 12.8204 16.986 12.0924C16.998 11.7344 17.01 11.3974 17.079 11.0804C17.24 10.3484 18.787 10.1534 19.746 10.0384C19.907 10.6674 20 11.3224 20 12.0004C20 14.5694 18.778 16.8534 16.889 18.3184ZM12 4.00037C12.616 4.00037 13.211 4.07637 13.787 4.20837C13.618 4.58037 13.357 4.91937 13.013 5.18837C12.795 5.36037 12.55 5.50337 12.307 5.64837C11.656 6.03637 10.919 6.47637 10.457 7.32237C9.841 8.45237 9.841 9.60637 9.841 10.6244C9.841 11.9794 9.797 12.7804 8.893 13.4874C7.524 14.5604 5.429 13.9614 4.133 13.4164C4.051 12.9554 4 12.4834 4 12.0004C4 7.58937 7.589 4.00037 12 4.00037ZM12 2.00037C6.486 2.00037 2 6.48637 2 12.0004C2 17.5134 6.486 22.0004 12 22.0004C17.514 22.0004 22 17.5134 22 12.0004C22 6.48637 17.514 2.00037 12 2.00037Z" fill="white" />
    </mask>
    <g mask="url(#mask0)">
      <rect width="24" height="24" fill="#718096" />
    </g>
  </svg>
)

const Phone = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.61 14.99 15.86 14.89 16.12 14.89C16.22 14.89 16.33 14.9 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3ZM6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02Z" fill="#718096" />
  </svg>
)
