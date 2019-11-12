import React, { useState, useEffect } from 'react'
import { businessService } from '../../../services/index'
import ProgramHeader from '../../../components/my_trips/program_header'
import NavBar from '../../../components/my_trips/nav_bar'
import PreTripInfo from '../../../components/my_trips/pre_trip_info'
import Loading from '../../../components/loading'
import BottomBar from '../../../components/my_trips/bottom_bar'


const Action = (item: any) => (
  <div className="border-solid border-t-2 p-3">
    {item.title}
    <ArrowDown />
  </div>
)

export default () => {
  const bs = businessService
  const [manage, setManage] = useState([])
  const [program, setProgram] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const resolve = await bs.getClientTrip(null)
      setManage(resolve[0].manage)
      setProgram(resolve[0].program)
    }
    fetchData()
  }, [])

  if (manage.length === 0) return <Loading />

  return (
    <div>
      <ProgramHeader program={program} />
      <NavBar />
      <PreTripInfo />
      <div className="manage_container m-5">
        <header>
            Need changes on your trip?
          <p>Look at the action you can do on your reservation</p>
        </header>
        <article className="mt-2">
          { manage.actions.map((item:any) => <Action key={item.title} item={item} />)}
        </article>
      </div>
      <BottomBar />
      <style>
        {
              `
              .manage_container header {
                font-size: 24px;
                line-height: 33px;
                letter-spacing: 0.15px;
              }
              .manage_container header p {
                font-weight: 300;
                font-size: 14px;
                line-height: 25px;
              }
              .manage_container article {
                font-weight: 300;
                font-size: 14px;
                line-height: 25px;
              }
              .manage_container article div {
                display: grid;
                grid-template-columns: 90% 10%;
              }
              `
            }
      </style>
    </div>
  )
}


const ArrowDown = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.2625 10.3688L15 16.0938L20.7375 10.3688L22.5 12.1313L15 19.6313L7.5 12.1313L9.2625 10.3688Z" fill="black" fillOpacity="0.54" />
  </svg>
)
