import React, { useState } from 'react'
import '../statics/style/style.css'
import OccupationCard from '../components/occupation/card'


export default () => {
  const reservation : Reservation = {
    id: 'test',
    reservationHolder: {
      id: 'leonardo',
      firstName: 'Leonardo Gabriel',
      lastName: 'Leenen',
      email: 'leonardo@flicktrip.com',
    },
    reservationLabel: 'Reserve For Leo',
    invoices: [''],
    daysInHold: 3,
    reservedAt: 12312312312,
    reservedBy: 'leonardoleenen',
    serviceFrom: 1588647600000,
    serviceTo: 1589079600000,
    termsAndConditionsLiteral: 'Terms',
    status: 1,
    paymentCommitments: [],
    pax: [{
      firstName: 'Leonardo Gabriel',
      lastName: 'Leenen',
      email: 'leonardo@flicktrip.com',
      id: 'leonardoleenen',
    },
    {
      firstName: 'Juan Martin',
      lastName: 'Germano',
      email: 'gmail@flicktrip.com',
      id: 'juanmartin',
    }, null],
  }

  return (
    <div>
      <OccupationCard
        showExpanded
        showReservationStatus={false}
        reservation={reservation}
      />
    </div>
  )
}
