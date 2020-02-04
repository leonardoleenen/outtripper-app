import React from 'react'
import { useRouter } from 'next/router'
import NavBar from '../components/bottom_nav_bar'

interface PropRows {
  label : string
  goTo: string
}


export default () => {
  const router = useRouter()

  const Row = (props: PropRows) => {
    const { label, goTo } = props
    return (
      <div className="flex items-center border-b" onClick={() => router.push(`/${goTo}`)}>
        <div className="py-4 w-full">{label}</div>
        <div className="pr-4">
          <IconArrowRight />
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 ">
      <header className="flex justify-center">
        <div className="pt-4 font-semibold">Menu</div>
      </header>
      <article className="pt-8 h-screen">
        <Row label="My Team" goTo="myteam" />
        <Row label="My Reservations" goTo="home" />

      </article>
      <NavBar />
    </div>
  )
}


const IconArrowRight = () => (
  <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.68359 0.472656C1.60742 0.396484 1.50781 0.349609 1.39648 0.349609C1.16797 0.349609 0.992188 0.525391 0.992188 0.753906C0.992188 0.865234 1.0332 0.970703 1.10352 1.04102L5.50977 5.23633L1.10352 9.41992C1.0332 9.49609 0.992188 9.60742 0.992188 9.71289C0.992188 9.94141 1.16797 10.1172 1.39648 10.1172C1.50781 10.1172 1.60156 10.0703 1.68359 9.99414L6.35938 5.55273C6.44727 5.46484 6.50586 5.35352 6.50586 5.23047C6.50586 5.10742 6.45313 5.00781 6.35938 4.91406L1.68359 0.472656Z" fill="black" />
  </svg>

)
