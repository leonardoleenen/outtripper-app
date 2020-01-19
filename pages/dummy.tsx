import React from 'react'
import '../statics/style/style.css'
import BottomBar from '../components/bottom_nav_bar'
import Auth from '../components/authorization'

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
