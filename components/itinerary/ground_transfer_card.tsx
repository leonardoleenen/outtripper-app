import React, { useEffect, useState } from 'react'

interface Props {
  from: string
  to: string
  darkMode: boolean
}

export default (props: Props) => {
  const { from, to, darkMode } = props
  const [token, setToken] = useState<TokenOuttripper>()


  return (
    <div className={`m-4  shadow rounded ${darkMode ? '' : 'border'}`}>
      <div className={`flex items-center p-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
        <div><IconShuttle /></div>
        <div className="ml-4"><span>Ground Transfer</span></div>
      </div>
      <div className={`flex  ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="p-4"><IconAvatar /></div>
        <div className="p-4 font-thin antialiased">
          <div>{`From: ${from}`}</div>
          <div>{`To: ${to}`}</div>
        </div>
      </div>
      <footer className={`flex p-4 ${darkMode ? 'bg-gray-800' : ''}`}>
        <div className="flex uppercase items-center text-gray-300 font-semibold">
          <div><IconLocation /></div>
          <div className="ml-2"><span>Location</span></div>
        </div>
        <div className="flex uppercase items-center ml-4  text-gray-300 font-semibold">
          <div><IconPhoneRing /></div>
          <div className="ml-2"><span>Call Driver</span></div>
        </div>
      </footer>
    </div>
  )
}

const IconShuttle = () => (
  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 0H2C0.9 0 0 0.89 0 2V11H2C2 12.66 3.34 14 5 14C6.66 14 8 12.66 8 11H14C14 12.66 15.34 14 17 14C18.66 14 20 12.66 20 11H22V6L16 0ZM14 2H15L18 5H14V2ZM12 2H8V5H12V2ZM2 2H6V5H2V2ZM3.75 11C3.75 11.69 4.31 12.25 5 12.25C5.69 12.25 6.25 11.69 6.25 11C6.25 10.31 5.69 9.75 5 9.75C4.31 9.75 3.75 10.31 3.75 11ZM17 12.25C16.31 12.25 15.75 11.69 15.75 11C15.75 10.31 16.31 9.75 17 9.75C17.69 9.75 18.25 10.31 18.25 11C18.25 11.69 17.69 12.25 17 12.25ZM19.22 9H20V7H2V9H2.78C3.33 8.39 4.11 8 5 8C5.89 8 6.67 8.39 7.22 9H14.78C15.33 8.39 16.12 8 17 8C17.88 8 18.67 8.39 19.22 9Z" fill="#718096" />
  </svg>

)

const IconAvatar = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill="#BBDEFB" />
    <path fillRule="evenodd" clipRule="evenodd" d="M30 30C33.315 30 36 27.315 36 24C36 20.685 33.315 18 30 18C26.685 18 24 20.685 24 24C24 27.315 26.685 30 30 30ZM30 33C25.995 33 18 35.01 18 39V42H42V39C42 35.01 34.005 33 30 33Z" fill="#2196F3" />
  </svg>

)

const IconLocation = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.88 14.12 16.19 12 18.88C9.92 16.21 7 11.85 7 9ZM9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C12.8932 6.5 13.7185 6.9765 14.1651 7.75C14.6116 8.5235 14.6116 9.4765 14.1651 10.25C13.7185 11.0235 12.8932 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9Z" fill="#CBD5E0" />
  </svg>
)

const IconPhoneRing = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.0125 1H4.01245C2.91245 1 2.01245 1.9 2.01245 3V21C2.01245 22.1 2.91245 23 4.01245 23H14.0125C15.1125 23 16.0125 22.1 16.0125 21V3C16.0125 1.9 15.1125 1 14.0125 1ZM19.1125 8.7L20.1125 7.7C22.6125 10.1 22.6125 13.9 20.1125 16.2L19.1125 15.2C20.9125 13.3 20.9125 10.5 19.1125 8.7ZM17.0125 10.8L18.0125 9.8C19.2125 11.1 19.2125 12.9 18.0125 14.1L17.0125 13.1C17.5125 12.4 17.5125 11.5 17.0125 10.8ZM4.01245 20H14.0125V4H4.01245V20Z" fill="#CBD5E0" />
  </svg>
)
