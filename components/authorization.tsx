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
      const privateElements = document.querySelectorAll('div[data-organization-kind]')
      privateElements.forEach((e: HTMLDivElement) => {
        const organizationKindsAllowed = e.getAttribute('data-organization-kind').split(',')
        if (organizationKindsAllowed.includes('*') || organizationKindsAllowed.includes(token.organizationKind)) {
          const rolesAllowed = (e.getAttribute('data-role-allowed')).split(',')
          e.style.display = rolesAllowed.includes(token.rol) ? 'block' : 'none'
        } else {
          e.style.display = 'none'
        }
      })
    }

    fetch()
  })


  return <div>{children}</div>
}
