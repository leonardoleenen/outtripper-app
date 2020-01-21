import React, { useEffect } from 'react'

interface Props {
  children: any
}
export default (props: Props) => {
  const { children } = props

  useEffect(() => {
    const element : HTMLDivElement = document.querySelector('div[data-component="carrousell"]')
    element.style.height = '270px'
    element.style.backgroundImage = "url('https://res.cloudinary.com/dtyymz4nn/image/upload/v1579544942/Jurassic%20Lake/jurasicLakeBackgroundMyTrips.png')"
  })

  return (
    <div>{children}</div>
  )
}
