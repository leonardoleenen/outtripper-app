import React from 'react'

interface InputText {
  label: string
}

const NavigationTop = () => (
  <div className="navigation ml-4 mb-8  pt-8 mr-4">
    <BackIcon />
    <div />

    <style jsx>
      {`.navigation{
              display:grid;
              grid-template-columns:30px 3fr 30px;    
              }
          
              `}

    </style>
  </div>
)

export default () => (
  <div>
    <NavigationTop />
    <h5 className="text-center font-normal mt-8 mb-12">Payment Successfully Done!</h5>
    <p className="text-center mr-10 ml-10 mb-8">We have charge $ 1,540 to your VISA CREDIT CARD XXXX XXXX XXXX 4242.</p>
    <p className="text-center mr-12 ml-12 mb-12">
      This payment is for Weekly Program at Oct 16, 2019
    </p>
    <SuccessIcon />
    <h5 className="text-center font-normal mt-12 mb-12 ml-16 mr-16">
      $1,540 Amount deducted from your card
    </h5>

  </div>
)


const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/hardware/keyboard_arrow_left_24px">
      <path id="icon/hardware/keyboard_arrow_left_24px_2" d="M15.7049 16.59L11.1249 12L15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59Z" fill="#3B414B" />
    </g>
  </svg>
)

const SuccessIcon = () => (
  <svg width="149" height="149" viewBox="0 0 149 149" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="74.5" cy="74.5" r="72.5" stroke="#76E2D5" strokeWidth="4" />
    <path fillRule="evenodd" clipRule="evenodd" d="M92.4142 61.6083C93.1953 62.4194 93.1953 63.7344 92.4142 64.5455L70.4142 87.3917C69.6332 88.2028 68.3668 88.2028 67.5858 87.3917L57.5858 77.0071C56.8047 76.196 56.8047 74.8809 57.5858 74.0699C58.3668 73.2588 59.6332 73.2588 60.4142 74.0699L69 82.9859L89.5858 61.6083C90.3668 60.7972 91.6332 60.7972 92.4142 61.6083Z" fill="#81E3D7" />
  </svg>

)
