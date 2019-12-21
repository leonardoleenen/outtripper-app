import React, { useEffect, useState } from 'react'
import _ from 'underscore'
import moment from 'moment'
import uuid4 from 'uuid4'
import Link from 'next/link'
import bs from '../services/business'
import Loading from '../components/loading'
import '../statics/style/style.scss'

const renderCalendar = (date : AvailableDate) => {
  let bgColor = 'green'

  if (date.freeSpots <= (date.totalSpots / 3)) { bgColor = 'orange' }


  return (
    <Link href={`/reservation_process/reservation_holder?id=${date.id}`}>
      <div className="flex-cols w-24 mx-2 my-2 rounded-lg shadow">
        <p className={`bg-${bgColor}-400 text-white font-medium text-center py-2 rounded-t-lg`}>
          {moment(date.from).format('MMM Do')}
          <br />
          {moment(date.to).format('MMM Do')}
        </p>
        <p className="text-center font-semibold">{`$ ${date.regularPrice}`}</p>
        <p className="text-center text-xs">{`${date.freeSpots} spots`}</p>
      </div>
    </Link>
  )
}


export default () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [availability, setAvailability] = useState<Array<AvailableDate>>([])

  useEffect(() => {
    const user : LoggedUser = bs.getLoggedUser()
    const fetchAvailability = async () => {
      setAvailability(await bs.getAllAvailableDate({ id: user.token.organizationId, cn: user.token.organizationCn }))
      setIsLoading(false)
    }


    fetchAvailability()
  }, [])

  const sortedList = _.groupBy(availability, (d: AvailableDate) => d.program.cn)

  const renderRow = (program: string) => {
    const listDates : Array<AvailableDate> = sortedList[program]

    return (

      <li className="flex" key={uuid4()}>
        {listDates.map((d: AvailableDate) => (
          renderCalendar(d)
        ))}
      </li>

    )
  }

  if (isLoading) return <Loading />

  return (
    <div className="ml-2">
      <h2 className="pt-8 ml-2"> Free Spots </h2>
      {Object.keys(sortedList).map((program) => (
        <div key={program}>
          <ul>
            <h3 className="mt-6 ml-2 text-xl">{program}</h3>
            {renderRow(program)}
          </ul>
        </div>
      ))}
    </div>
  )
}
