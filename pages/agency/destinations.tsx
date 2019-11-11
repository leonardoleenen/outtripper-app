import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import BottomNavBar from '../../components/agency_bottom_nav_bar'
import businessService from '../../services/business'
import { setDestination } from '../../redux/actions/core'
import DestinationCard from '../../components/destination_card'
import DestinationTab from '../../components/destination_tabs'


export default () => {
  const bs = businessService
  const [destinations, setDestinations] = useState([])
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDestinations = async () => {
      setDestinations(await bs.getDestinations())
    }
    fetchDestinations()
  }, [])

  const destinationSelected = (destinationId: string) => {
    const destination : Destination = destinations.filter((d: Destination) => d.id === destinationId)[0]
    dispatch(setDestination(destination))
    router.push(`/agency/global_availability?destination_id=${destinationId}`)
  }

  return (
    <div className="bg-gray">
      <DestinationTab />
      <ul>
        {destinations.map((d:Destination) => (
          <li key={d.id} onClick={() => destinationSelected(d.id)}>
            {d.cn }
          </li>

        )) }
      </ul>
      <BottomNavBar />
      <style jsx>
        {
        `

        .bg-gray{
          background: linear-gradient(180deg, #F7FAFC 0%, #CBD5E0 100%);
          min-height:100vh;
          
        }

          
            `
      }

      </style>

    </div>
  )
}
