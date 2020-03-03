import React, { useState } from 'react'
import '../statics/style/style.css'
import CheckoutPaymentForm from '../components/payment_checkout'
/*
export default () => (
  <Auth>
    <div>
      <div>Dummy test page</div>
      <div>Its visible </div>
      <div data-organization-kind="AGENCY" data-role-allowed={['OWNER', 'SELLER']}>Its not visible</div>
      <button type="reset" onClick={() => console.log('Salio')}>Test</button>
      <BottomBar />
    </div>
  </Auth>
)
*/

export default () => {
  const items = [{
    id: 'INSTALLMENT1',
    name: 'installment 1',
    amount: 1500,
  },
  {
    id: 'INSTALLMENT2',
    name: 'installment 1',
    amount: 1500,
  },
  {
    id: 'INSTALLMENT3',
    name: 'installment 3',
    amount: 1500,
  }]
  return (
    <div className="bg-black h-screen relative">
      <CheckoutPaymentForm callFunction={() => console.log('Funca')} items={items} chargeDescription="Test from dummy" />
    </div>
  )
}
