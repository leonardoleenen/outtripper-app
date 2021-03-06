import React, { useEffect, useState } from 'react'
import '../statics/style/style.css'
import Link from 'next/link'

const styleBox = 'ml-2 my-4 w-1/4 flex-cols'
const styleText = 'font-thin text-sm '

export default () => {
  const [activePage, setActivePage] = useState(null)
  useEffect(() => {
    setActivePage(window.location.pathname.substring(1))
  }, [])

  const IconHome = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Icon/Outline/home">
        <path id="MaskHome" fillRule="evenodd" clipRule="evenodd" d="M18.9902 20.0004H16.0002V13.0004C16.0002 12.4474 15.5522 12.0004 15.0002 12.0004H9.00024C8.44724 12.0004 8.00024 12.4474 8.00024 13.0004V20.0004H5.00024L5.00624 11.5834L11.9982 4.43245L19.0002 11.6244L18.9902 20.0004ZM10.0002 20.0004H14.0002V14.0004H10.0002V20.0004ZM20.4242 10.1854L12.7152 2.30145C12.3382 1.91645 11.6622 1.91645 11.2852 2.30145L3.57524 10.1864C3.21024 10.5614 3.00024 11.0854 3.00024 11.6244V20.0004C3.00024 21.1034 3.84724 22.0004 4.88824 22.0004H9.00024H15.0002H19.1112C20.1522 22.0004 21.0002 21.1034 21.0002 20.0004V11.6244C21.0002 11.0854 20.7902 10.5614 20.4242 10.1854Z" fill="#718096" />
        <mask id="mask0Home" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="2" width="19" height="21">
          <path id="Mask_2Home" fillRule="evenodd" clipRule="evenodd" d="M18.9902 20.0004H16.0002V13.0004C16.0002 12.4474 15.5522 12.0004 15.0002 12.0004H9.00024C8.44724 12.0004 8.00024 12.4474 8.00024 13.0004V20.0004H5.00024L5.00624 11.5834L11.9982 4.43245L19.0002 11.6244L18.9902 20.0004ZM10.0002 20.0004H14.0002V14.0004H10.0002V20.0004ZM20.4242 10.1854L12.7152 2.30145C12.3382 1.91645 11.6622 1.91645 11.2852 2.30145L3.57524 10.1864C3.21024 10.5614 3.00024 11.0854 3.00024 11.6244V20.0004C3.00024 21.1034 3.84724 22.0004 4.88824 22.0004H9.00024H15.0002H19.1112C20.1522 22.0004 21.0002 21.1034 21.0002 20.0004V11.6244C21.0002 11.0854 20.7902 10.5614 20.4242 10.1854Z" fill="white" />
        </mask>
        <g mask="url(#mask0Home)">
          <g id="&#240;&#159;&#142;&#168; Color">
            <rect id="BaseHome" width="24" height="24" fill={activePage === 'home' ? '#4299e1' : '#718096 '} />
          </g>
        </g>
      </g>
    </svg>
  )

  const IconRoomService = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="icon/places/room_service_24px">
        <path id="icon/places/room_service_24px_2" fillRule="evenodd" clipRule="evenodd" d="M21 16C20.73 11.93 17.75 8.6 13.84 7.79C13.94 7.55 14 7.28 14 7C14 5.9 13.1 5 12 5C10.9 5 10 5.9 10 7C10 7.28 10.06 7.55 10.16 7.79C6.25 8.6 3.27 11.93 3 16H21ZM18.98 17H2V19H22V17H18.98ZM18.5 13.99C17.47 11.41 14.95 9.58 12 9.58C9.05 9.58 6.53 11.41 5.5 13.99H18.5Z" fill={activePage === 'availability' ? '#4299e1' : '#718096 '} />
      </g>
    </svg>
  )

  const IconPromotions = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Icon/Outline/volume-up">
        <path id="MaskPromo" fillRule="evenodd" clipRule="evenodd" d="M13.5 18.1012L8.399 14.6032C8.232 14.4902 8.035 14.4282 7.833 14.4282H3.5V9.57116H7.833C8.035 9.57116 8.232 9.50916 8.399 9.39616L13.5 5.89816V18.1012ZM14.966 3.11516C14.637 2.94116 14.24 2.96416 13.935 3.17416L7.523 7.57116H2.5C1.948 7.57116 1.5 8.01816 1.5 8.57116V15.4282C1.5 15.9812 1.948 16.4282 2.5 16.4282H7.523L13.935 20.8252C14.104 20.9412 14.302 20.9992 14.5 20.9992C14.66 20.9992 14.82 20.9612 14.966 20.8842C15.294 20.7112 15.5 20.3712 15.5 19.9992V3.99916C15.5 3.62816 15.294 3.28816 14.966 3.11516ZM18.2793 8.37256C17.9323 7.94256 17.3033 7.87556 16.8733 8.22056C16.4433 8.56656 16.3743 9.19556 16.7203 9.62656C17.7563 10.9126 17.7563 13.0866 16.7203 14.3726C16.3743 14.8036 16.4433 15.4326 16.8733 15.7786C17.0583 15.9276 17.2793 15.9996 17.4993 15.9996C17.7913 15.9996 18.0813 15.8716 18.2793 15.6266C19.9153 13.5926 19.9153 10.4066 18.2793 8.37256ZM18.2297 5.36206C18.5817 4.93606 19.2127 4.87706 19.6377 5.22906C21.8057 7.02506 22.9997 9.43006 22.9997 12.0001C22.9997 14.5691 21.8057 16.9741 19.6377 18.7701C19.4507 18.9241 19.2247 19.0001 19.0007 19.0001C18.7127 19.0001 18.4277 18.8761 18.2297 18.6371C17.8777 18.2121 17.9367 17.5821 18.3627 17.2291C20.0627 15.8201 20.9997 13.9631 20.9997 12.0001C20.9997 10.0361 20.0627 8.17906 18.3627 6.77006C17.9367 6.41706 17.8777 5.78706 18.2297 5.36206Z" fill="#231F20" />
        <mask id="mask0Promo" mask-type="alpha" maskUnits="userSpaceOnUse" x="1" y="2" width="22" height="19">
          <path id="Mask_2Promo" fillRule="evenodd" clipRule="evenodd" d="M13.5 18.1012L8.399 14.6032C8.232 14.4902 8.035 14.4282 7.833 14.4282H3.5V9.57116H7.833C8.035 9.57116 8.232 9.50916 8.399 9.39616L13.5 5.89816V18.1012ZM14.966 3.11516C14.637 2.94116 14.24 2.96416 13.935 3.17416L7.523 7.57116H2.5C1.948 7.57116 1.5 8.01816 1.5 8.57116V15.4282C1.5 15.9812 1.948 16.4282 2.5 16.4282H7.523L13.935 20.8252C14.104 20.9412 14.302 20.9992 14.5 20.9992C14.66 20.9992 14.82 20.9612 14.966 20.8842C15.294 20.7112 15.5 20.3712 15.5 19.9992V3.99916C15.5 3.62816 15.294 3.28816 14.966 3.11516ZM18.2793 8.37256C17.9323 7.94256 17.3033 7.87556 16.8733 8.22056C16.4433 8.56656 16.3743 9.19556 16.7203 9.62656C17.7563 10.9126 17.7563 13.0866 16.7203 14.3726C16.3743 14.8036 16.4433 15.4326 16.8733 15.7786C17.0583 15.9276 17.2793 15.9996 17.4993 15.9996C17.7913 15.9996 18.0813 15.8716 18.2793 15.6266C19.9153 13.5926 19.9153 10.4066 18.2793 8.37256ZM18.2297 5.36206C18.5817 4.93606 19.2127 4.87706 19.6377 5.22906C21.8057 7.02506 22.9997 9.43006 22.9997 12.0001C22.9997 14.5691 21.8057 16.9741 19.6377 18.7701C19.4507 18.9241 19.2247 19.0001 19.0007 19.0001C18.7127 19.0001 18.4277 18.8761 18.2297 18.6371C17.8777 18.2121 17.9367 17.5821 18.3627 17.2291C20.0627 15.8201 20.9997 13.9631 20.9997 12.0001C20.9997 10.0361 20.0627 8.17906 18.3627 6.77006C17.9367 6.41706 17.8777 5.78706 18.2297 5.36206Z" fill="white" />
        </mask>
        <g mask="url(#mask0Promo)">
          <g id="&#240;&#159;&#142;&#168; Color">
            <rect id="BasePromotions" width="24" height="24" fill={activePage === 'promotions' ? '#4299e1' : '#718096 '} />
          </g>
        </g>
      </g>
    </svg>

  )


  const IconCalendar = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Icon/Outline/calendar">
        <path id="MaskCalendar" fillRule="evenodd" clipRule="evenodd" d="M7 16C7 15.45 7.45 15 8 15C8.55 15 9 15.45 9 16C9 16.55 8.55 17 8 17C7.45 17 7 16.55 7 16ZM12 15H16C16.55 15 17 15.45 17 16C17 16.55 16.55 17 16 17H12C11.45 17 11 16.55 11 16C11 15.45 11.45 15 12 15ZM18 20H6C5.449 20 5 19.551 5 19V13H19V19C19 19.551 18.551 20 18 20ZM6 6H7V7C7 7.55 7.45 8 8 8C8.55 8 9 7.55 9 7V6H15V7C15 7.55 15.45 8 16 8C16.55 8 17 7.55 17 7V6H18C18.551 6 19 6.449 19 7V11H5V7C5 6.449 5.449 6 6 6ZM18 4H17V3C17 2.45 16.55 2 16 2C15.45 2 15 2.45 15 3V4H9V3C9 2.45 8.55 2 8 2C7.45 2 7 2.45 7 3V4H6C4.346 4 3 5.346 3 7V19C3 20.654 4.346 22 6 22H18C19.654 22 21 20.654 21 19V7C21 5.346 19.654 4 18 4Z" fill="#718096" />
        <mask id="mask0Calendar" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="2" width="18" height="20">
          <path id="Mask_2Calendar" fillRule="evenodd" clipRule="evenodd" d="M7 16C7 15.45 7.45 15 8 15C8.55 15 9 15.45 9 16C9 16.55 8.55 17 8 17C7.45 17 7 16.55 7 16ZM12 15H16C16.55 15 17 15.45 17 16C17 16.55 16.55 17 16 17H12C11.45 17 11 16.55 11 16C11 15.45 11.45 15 12 15ZM18 20H6C5.449 20 5 19.551 5 19V13H19V19C19 19.551 18.551 20 18 20ZM6 6H7V7C7 7.55 7.45 8 8 8C8.55 8 9 7.55 9 7V6H15V7C15 7.55 15.45 8 16 8C16.55 8 17 7.55 17 7V6H18C18.551 6 19 6.449 19 7V11H5V7C5 6.449 5.449 6 6 6ZM18 4H17V3C17 2.45 16.55 2 16 2C15.45 2 15 2.45 15 3V4H9V3C9 2.45 8.55 2 8 2C7.45 2 7 2.45 7 3V4H6C4.346 4 3 5.346 3 7V19C3 20.654 4.346 22 6 22H18C19.654 22 21 20.654 21 19V7C21 5.346 19.654 4 18 4Z" fill="white" />
        </mask>
        <g mask="url(#mask0Calendar)">
          <g id="&#240;&#159;&#142;&#168; Color">
            <rect id="BaseCalendar" width="24" height="24" fill={activePage === 'occupation' ? '#4299e1' : '#718096 '} />
          </g>
        </g>
      </g>
    </svg>

  )


  const MenuHorizontal = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Icon/Outline/more-horizontal">
        <path id="MaskMenu" fillRule="evenodd" clipRule="evenodd" d="M3 12C3 10.896 3.896 10 5 10C6.104 10 7 10.896 7 12C7 13.104 6.104 14 5 14C3.896 14 3 13.104 3 12ZM12 10C10.896 10 10 10.896 10 12C10 13.104 10.896 14 12 14C13.104 14 14 13.104 14 12C14 10.896 13.104 10 12 10ZM19 10C17.896 10 17 10.896 17 12C17 13.104 17.896 14 19 14C20.104 14 21 13.104 21 12C21 10.896 20.104 10 19 10Z" fill="#718096" />
        <mask id="mask0Menu" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="10" width="18" height="4">
          <path id="Mask_2Menu" fillRule="evenodd" clipRule="evenodd" d="M3 12C3 10.896 3.896 10 5 10C6.104 10 7 10.896 7 12C7 13.104 6.104 14 5 14C3.896 14 3 13.104 3 12ZM12 10C10.896 10 10 10.896 10 12C10 13.104 10.896 14 12 14C13.104 14 14 13.104 14 12C14 10.896 13.104 10 12 10ZM19 10C17.896 10 17 10.896 17 12C17 13.104 17.896 14 19 14C20.104 14 21 13.104 21 12C21 10.896 20.104 10 19 10Z" fill="white" />
        </mask>
        <g mask="url(#mask0Menu)">
          <g id="&#240;&#159;&#142;&#168; Color">
            <rect id="BaseMenuHorizontal" width="24" height="24" fill={activePage === 'menu' ? '#4299e1' : '#718096 '} />
          </g>
        </g>
      </g>
    </svg>

  )


  return (
    <div className="inset-x-0 bottom-0 flex">
      <Link href="/home">
        <div className={styleBox}>
          <IconHome />
          <div className="flex justify-center"><span className={activePage === 'home' ? `${styleText} text-blue-700` : styleText}>home</span></div>
        </div>
      </Link>
      <Link href="/availability">
        <div className={styleBox}>
          <IconRoomService />
          <div className="flex justify-center"><span className={activePage === 'availability' ? `${styleText} text-blue-700` : styleText}>Availability</span></div>
        </div>
      </Link>
      <div className={styleBox}>
        <IconPromotions />
        <div className="flex justify-center"><span className={activePage === 'promotions' ? `${styleText} text-blue-700` : styleText}>Promotions</span></div>
      </div>
      <div className={styleBox}>
        <IconCalendar />
        <div className="flex justify-center"><span className={activePage === 'occupation' ? `${styleText} text-blue-700` : styleText}>Occupation</span></div>
      </div>
      <Link href="/menu">
        <div className={styleBox}>
          <MenuHorizontal />
          <div className="flex justify-center"><span className={activePage === 'menu' ? `${styleText} text-blue-700` : styleText}>More</span></div>
        </div>
      </Link>
    </div>
  )
}
