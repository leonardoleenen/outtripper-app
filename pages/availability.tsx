import React, { useEffect, useState } from 'react'
import _ from 'underscore'
import moment from 'moment'
import bs from '../services/business'
import Loading from '../components/loading'
import '../statics/style/style.scss'

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
      <li>
        {listDates.map((d: AvailableDate) => (
          <div key={d.id}>
            {' '}
            {moment(d.from).format('DD MM YY')}
          </div>
        ))}
      </li>
    )
  }

  if (isLoading) return <Loading />

  return (
    <div>
      <h1> Availability Dates </h1>
      {Object.keys(sortedList).map((program) => (
        <div key={program}>
          <ul>
            {program}
            {renderRow(program)}
          </ul>
        </div>
      ))}
    </div>
  )
}
