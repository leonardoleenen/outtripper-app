import React, { useState, useEffect } from 'react'
import { businessService } from '../../../services/index'
import ProgramHeader from '../../../components/my_trips/program_header'
import NavBar from '../../../components/my_trips/nav_bar'
import PreTripInfo from '../../../components/my_trips/pre_trip_info'
import Loading from '../../../components/loading'

export default () => {
  const bs = businessService
  const [itinerary, setItinerary] = useState([])
  const [program, setProgram] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const resolve = await bs.getClientTrip(null)
      setItinerary(resolve[0].itinerary)
      setProgram(resolve[0].program)
    }
    fetchData()
  }, []) // usar el use effect para trabajar el momento del load de la pagina

  if (itinerary.length === 0) return <Loading />

  return (
    <div>
      <ProgramHeader program={program} />
      <NavBar />
      <PreTripInfo />
    </div>
  )
}
