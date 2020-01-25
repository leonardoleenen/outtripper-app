import React, { useState } from 'react'
import moment from 'moment'
import ItineraryCardLodgeActivitie from '../itinerary/lodge_activitie'
import ItineraryCardGroundTrasnfer from '../itinerary/ground_transfer_card'
import AddButton from '../add_button'

interface Props {
  reservation: Reservation
}
export default (props: Props) => {
  const { reservation } = props
  const [selectedPax, setSelectedPax] = useState<Contact>(null)

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


  /*
<div className="px-4 pt-4 font-semibold text-xl">Defaul Itineary for all guest</div>
      {reservation.program.defaultItinerary.map((i, indexItinerary: number) => (
        <div key={`iti${indexItinerary.toString()}`} className="mt-4">
          <div className="px-4 pt-4 font-semibold"><span>{moment(reservation.serviceFrom).add(i.day, 'days').format('LLL')}</span></div>
          {getItineraryCard(i.service)}
        </div>
      ))}

  */

  const getCustomItinerary = (pax: Contact) : Array<{day: number, service : ItineraryGroundTransfer | ItineraryActivities}> => reservation.program.defaultItinerary
    .concat(reservation.customItineraries.filter((i) => i.contactId === pax.id)).sort((e) => e.day)

  return (
    <div className="relative flex-cols mb-16">
      <div className="font-semibold text-base text-gray-600 mt-4 ml-4">{`${reservation.pax.length} Guest`}</div>
      <div className=" carrusel py-4 flex border-b pl-4">
        {reservation.pax.map((p:Contact, index:number) => (
          <div
            onClick={() => setSelectedPax(p)}
            key={`itinpax${index.toString()}`}
            className="flex-cols justify-center avatarBox"
          >
            <div className="avatar rounded-full" />
            <div className="text-xs font-semibold text-xs">
              {p ? `${p.lastName}, ${p.firstName}` : 'Guest'}

            </div>
          </div>
        ))}
      </div>

      {selectedPax ? (
        <div>
          <div className="px-4 pt-4 font-semibold text-xl">{`Custom itinerary for ${selectedPax.lastName} ${selectedPax.firstName}`}</div>
          <div className="px-4 pt-4 font-thin text-blue-500"> Add new event </div>
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
