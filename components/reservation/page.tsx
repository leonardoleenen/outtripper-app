import React from 'react'

interface Props {
  children: any
  next: string
  back: string
  label: string
  title: string
}

export default (props: Props) => {
  const { children, label, title } = props
  return (
    <div className="page h-screen text-white relative  ">

      <div className="flex pt-8">
        <div className=" h-12 w-12"><IconBack /></div>
        <div className="font-thin">{label}</div>
      </div>


      <p className="mx-4 mt-16 text-3xl font-thin">{title}</p>
      {children}
      <div className=" ripple right-0 bottom-0 absolute h-16 w-16 mr-8 mb-8 bg-white rounded-full flex items-center"><IconArrow /></div>

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

const IconArrow = () => (
  <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.1381 24.5436C13.5152 24.5436 13.8898 24.3796 14.1456 24.0618L20.3817 16.3118C20.7666 15.8326 20.7615 15.148 20.3675 14.6753L13.9092 6.92529C13.4532 6.37762 12.6382 6.30399 12.0892 6.75995C11.5416 7.21591 11.4679 8.03095 11.9252 8.57862L17.7054 15.5162L12.1319 22.4421C11.6849 22.9975 11.7728 23.8112 12.3295 24.2582C12.5671 24.4506 12.8539 24.5436 13.1381 24.5436Z" fill="#539394" />
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="11" y="6" width="10" height="19">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.1381 24.5436C13.5152 24.5436 13.8898 24.3796 14.1456 24.0618L20.3817 16.3118C20.7666 15.8326 20.7615 15.148 20.3675 14.6753L13.9092 6.92529C13.4532 6.37762 12.6382 6.30399 12.0892 6.75995C11.5416 7.21591 11.4679 8.03095 11.9252 8.57862L17.7054 15.5162L12.1319 22.4421C11.6849 22.9975 11.7728 23.8112 12.3295 24.2582C12.5671 24.4506 12.8539 24.5436 13.1381 24.5436Z" fill="white" />
    </mask>
    <g mask="url(#mask0)" />
  </svg>
)

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
