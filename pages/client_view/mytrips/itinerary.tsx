import React, { useEffect } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { businessService } from '../../../services/index'
import InternationalFlightCard from '../../../components/my_trips/itinerary/card_international_flight'
import FlightCharterCard from '../../../components/my_trips/itinerary/card_flight_charter'
import LodgeActivitiesCard from '../../../components/my_trips/itinerary/card_lodge_activities'
import GroundTransferCard from '../../../components/my_trips/itinerary/card_ground_transfer'
import ProgramHeader from '../../../components/my_trips/program_header'
import NavBar from '../../../components/my_trips/nav_bar'
import BottomBar from '../../../components/my_trips/bottom_bar'
import PreTripInfo from '../../../components/my_trips/pre_trip_info'
import Loading from '../../../components/Loading'
import { MyTrip, MyTripItinerary } from '../../../services/type'
import { setMyCurrentTrip } from '../../../redux/actions/client_app'

const renderCard = (item: any) => {
  switch (item.type) {
    case 'flight':
      return <InternationalFlightCard key={item.code} label="Flight to Buenos Aires" flight_data={item} />
    case 'ground_transfer':
      return <GroundTransferCard key={item.code} transfer_data={item} />
    case 'flight_charter':
      return <FlightCharterCard key={item.code} charter_data={item} />
    case 'lodge_activities':
      return <LodgeActivitiesCard key={item.code} lodge_activities_data={item} />
    default:
      return <div />
  }
}


export default () => {
  const bs = businessService
  // const [ itinerary, setItinerary] = useState([])
  // const [ program, setProgram] = useState(null)
  const router = useRouter()
  const { bookId } = router.query
  const currentTrip: MyTrip = useSelector((state) => state.clientApp.currentTrip)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const resolve = await bs.getClientTrip(null)
      dispatch(setMyCurrentTrip(resolve[0]))
      // setItinerary(resolve[0]['itinerary'])
      // setProgram(resolve[0]['program'])
    }
    if (bookId) { fetchData() }
  }, [bookId, bs, dispatch]) // usar el use effect para trabajar el momento del load de la pagina
  if (!currentTrip || (currentTrip && currentTrip.itinerary.length === 0)) return <Loading />

  return (
    <div>
      <ProgramHeader program={currentTrip.program} />
      <NavBar />
      <PreTripInfo />
      { currentTrip.itinerary.map((e: MyTripItinerary) => ( // First map group by date
        <div key={e.date}>
          <p key={e.date}>{moment(e.date).format('Do MMM YYYY')}</p>
          { e.items.map((d: any) => // Second map iterate all elements
            renderCard(d), // Call a function for render
          )}
        </div>
      ))}
      <BottomBar />
    </div>
  )
}
