import React, { useEffect, useState } from 'react'
import BottomNavBar from '../../components/agency_bottom_nav_bar'
import { businessService } from '../../services/business'


export default () => {
  const bs = businessService
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    const fetchDestinations = async () => {
      setDestinations(await bs.getDestinations())
    }
    fetchDestinations()
  }, [])

  return (
    <div>
      <ul>
        {destinations.map((d:Destination) => (
          <li key={d.id}>
            {d.cn }
          </li>
        )) }
      </ul>
      <BottomNavBar />
      <div> Destination List</div>
    </div>
  )
}
