import React, { useEffect } from 'react'
import bs from '../services/business'

interface Props {
  children: any
}

export default (props: Props) => {
  const { children } = props

  useEffect(() => {
    const fetch = async () => {
      const token = await bs.getToken()
      const privateElements = document.querySelectorAll('div[data-role-allowed]')
      privateElements.forEach((e: HTMLDivElement) => {
        const rolesAllowed = (e.getAttribute('data-role-allowed')).split(',')
        e.style.display = rolesAllowed.includes(token.rol) ? 'block' : 'none'
      })
    }

    fetch()
  })


  return <div>{children}</div>
}
