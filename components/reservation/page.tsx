import React from 'react'
import { useRouter } from 'next/router'

interface Props {
  children: any
  back: string
  label: string
  title: string
}

export default (props: Props) => {
  const {
    children, label, title,
  } = props

  const router = useRouter()

  return (
    <div className="page h-screen text-white relative  ">

      <div className="flex pt-8">
        <div className=" h-12 w-12"><IconBack /></div>
        <div className="font-thin">{label}</div>
      </div>


      <p className="mx-4 mt-16 text-3xl font-thin">{title}</p>
      {children}

      <style>
        {`
        .page {
          background: linear-gradient(180deg, #549495 25.52%, #386571 61.98%);
        }
        
        .ripple {
          background-position: center;
          transition: background 0.5s;
        }
        .ripple:hover {
          background: white radial-gradient(circle, transparent 1%, #386571 1%) center/15000%;
        }
        .ripple:active {
          background-color: #6eb9f7;
          background-size: 100%;
          transition: background 0s;
        }


      `}

      </style>
    </div>
  )
}


const IconBack = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.8287 18.9995C13.5367 18.9995 13.2467 18.8725 13.0487 18.6265L8.22066 12.6265C7.92266 12.2555 7.92666 11.7255 8.23166 11.3595L13.2317 5.3595C13.5847 4.9355 14.2157 4.8785 14.6407 5.2315C15.0647 5.5845 15.1217 6.2155 14.7677 6.6395L10.2927 12.0105L14.6077 17.3725C14.9537 17.8025 14.8857 18.4325 14.4547 18.7785C14.2707 18.9275 14.0487 18.9995 13.8287 18.9995Z" fill="white" />
    <mask id="mask0Back" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="5" width="7" height="14">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.8287 18.9995C13.5367 18.9995 13.2467 18.8725 13.0487 18.6265L8.22066 12.6265C7.92266 12.2555 7.92666 11.7255 8.23166 11.3595L13.2317 5.3595C13.5847 4.9355 14.2157 4.8785 14.6407 5.2315C15.0647 5.5845 15.1217 6.2155 14.7677 6.6395L10.2927 12.0105L14.6077 17.3725C14.9537 17.8025 14.8857 18.4325 14.4547 18.7785C14.2707 18.9275 14.0487 18.9995 13.8287 18.9995Z" fill="white" />
    </mask>
    <g mask="url(#mask0Back)">
      <rect width="24" height="24" fill="white" />
    </g>
  </svg>

)
