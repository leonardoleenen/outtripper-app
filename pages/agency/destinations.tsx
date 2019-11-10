import React, { useEffect } from 'react';
import BottomNavBar from '../../components/agency_bottom_nav_bar'
import {businessService} from '../../services/business'



export default () => {

  const bs = businessService

  useEffect(() => {
    const fetchDestinations = async() => {
      console.log(await bs.getDestinations())
    }
    fetchDestinations()
  }, [])

  return (<div>
    <BottomNavBar />
    <div> Destination List</div>
  </div>)
}