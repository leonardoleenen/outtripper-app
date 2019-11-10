import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import businessServive from '../../services/business'
import { StoreData } from '../../redux/store'

export default () => {
  const bs = businessServive
  const destination : Destination = useSelector((state:StoreData) => state.core.destination)
  // const [programs, setPrograms] = useState([])
  const [availableDates, setAvailableDates] = useState([])

  useEffect(() => {
    /*
    const fetchPrograms = async () => {
      setPrograms(await bs.getPrograms(destination))
    } */
    const fetchAvailableDates = async () => {
      setAvailableDates(await bs.getAllAvailableDate(destination))
    }

    fetchAvailableDates()
  }, [])

  return (
    <div>
      {availableDates.map((a:AvailableDate) => (
        <div key={a.id}>
          {a.program.cn}
        </div>
      ))}
    </div>
  )
}
