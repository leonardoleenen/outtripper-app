import React from 'react'
import Link from 'next/link'

export default () => (
  <div>
  Botonera
    <ul>
      <li>Home</li>
      <Link href="/agency/destinations">
        <li>destinations</li>
      </Link>
      <li>reservations</li>
      <li>Notifications</li>
    </ul>
  </div>
)
