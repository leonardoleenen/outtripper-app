import React from 'react'
import uuid4 from 'uuid4'
import PaymentTeamMember from '../../components/mytrip/payment_team_member'

export default () => {
  const paymentList : Array<Payment> = [{
    amount: 7500,
    date: new Date().getTime(),
    id: uuid4(),
    invoiceId: 'XX',
    kind: 'WIRE_TRANSFER',
    paymentDate: new Date().getTime(),
    reference: 'Test',
  }, {
    amount: 7500,
    date: new Date().getTime(),
    id: uuid4(),
    invoiceId: 'XX',
    kind: 'WIRE_TRANSFER',
    paymentDate: new Date().getTime(),
    reference: 'Test',
  },
  ]
  return (
    <div>
      ok

    </div>
  )
}
