import React, { useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import ItineraryCardLodgeActivitie from '../itinerary/lodge_activitie'
import ItineraryCardGroundTrasnfer from '../itinerary/ground_transfer_card'
import AddButton from '../add_button'
import { setContact } from '../../redux/actions/contact_calendar'


interface Props {
  reservation: Reservation
}
export default (props: Props) => {
  const { reservation } = props
  const dispatch = useDispatch()
  const [selectedPax, setSelectedPax] = useState<Contact>(null)


  interface PropsIconSinglePeople {
    isSelected: boolean
  }
  const IconSinglePeople = (isSelected: PropsIconSinglePeople) => (
    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.8624 10.4872C13.4512 10.4872 15.6086 8.20163 15.6086 5.27464C15.6086 2.42929 13.4396 0.190315 10.8624 0.190315C8.29693 0.190315 6.11627 2.45261 6.12793 5.28631C6.12793 8.20163 8.27361 10.4872 10.8624 10.4872ZM3.64407 21.3789H18.0808C20.0749 21.3789 20.7512 20.7375 20.7512 19.6297C20.7512 16.6444 16.903 12.5396 10.8624 12.5396C4.8102 12.5396 0.973633 16.6444 0.973633 19.6297C0.973633 20.7375 1.64999 21.3789 3.64407 21.3789Z" fill={isSelected ? '#A1C3C3' : '#285e61'} />
    </svg>
  )

  const getItineraryCard = (service: ItineraryGroundTransfer | ItineraryActivities) => {
    switch (service.kind) {
      case 'GROUNDTRANSFER':
        return <ItineraryCardGroundTrasnfer from={(service as ItineraryGroundTransfer).from} to={(service as ItineraryGroundTransfer).to} />
      case 'LODGEACTIVITIE':
        return <ItineraryCardLodgeActivitie text={(service as ItineraryActivities).text} />
      default:
        return ''
    }
  }


  const getCustomItinerary = (pax: Contact) : Array<{day: number, service : ItineraryGroundTransfer | ItineraryActivities}> => reservation.program.defaultItinerary
    .concat(reservation.customItineraries.filter((i) => i.contactId === pax.id)).sort((e) => e.day)

  return (
    <div className="relative flex-cols mb-16">
      <div className="font-semibold text-base text-gray-600 mt-4 ml-4">{`${reservation.pax.length} Guest`}</div>
      <div className=" carrusel py-4 flex border-b pl-4">
        {reservation.pax.map((p:Contact, index:number) => (
          <div
            onClick={() => {
              setSelectedPax(p)
              dispatch(setContact(p))
            }}
            key={`itinpax${index.toString()}`}
            className="flex-cols justify-center avatarBox"
          >
            <div className={`h-16 w-16 rounded-full flex items-center justify-center ${selectedPax && selectedPax.id === p.id ? 'bg-teal-500 border-teal-600 border-2' : ' bg-teal-800'}`}>
              <div>
                <IconSinglePeople isSelected={selectedPax && selectedPax.id === p.id} />
              </div>
            </div>
            <div className="text-xs font-semibold text-xs">
              {p ? `${p.lastName}, ${p.firstName}` : 'Guest'}
            </div>
          </div>
        ))}
      </div>

      {selectedPax ? (
        <div>
          <div className="px-4 pt-4 flex justify-center"><div className="text-base text-gray-500 text-xl ">Custom itinerary for</div></div>
          <div className="mb-4 flex justify-center"><div className="font-semibold text-xl ">{`${selectedPax.lastName} ${selectedPax.firstName}`}</div></div>
          <Link href="/itinerary/event_selector">
            <div className="p-4 border w-40 font-semibold text-white rounded-lg bg-teal-500 m-auto ">
              <div>Add new event</div>
            </div>
          </Link>
          {getCustomItinerary(selectedPax).map((i, indexItinerary: number) => (
            <div key={`iti${indexItinerary.toString()}`} className="mt-4">
              <div className="px-4 pt-4 font-semibold"><span>{moment(reservation.serviceFrom).add(i.day, 'days').format('LLL')}</span></div>
              {getItineraryCard(i.service)}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="px-4 pt-4 font-semibold text-xl">Default Itineary for all guest</div>
          {reservation.program.defaultItinerary.map((i, indexItinerary: number) => (
            <div key={`iti${indexItinerary.toString()}`} className="mt-4">
              <div className="px-4 pt-4 font-semibold"><span>{moment(reservation.serviceFrom).add(i.day, 'days').format('LLL')}</span></div>
              {getItineraryCard(i.service)}
            </div>
          ))}
        </div>
      )}


      <style>
        {`
        
          .avatar {
            background:url('/img/people_avatar.png');
            background-repeat: no-repeat;
            height: 60px;
          }

          .avatarBox {
            width: 90px;
          }
        `}
      </style>

    </div>
  )
}