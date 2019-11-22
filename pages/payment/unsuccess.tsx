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
    <h5 className="text-center font-normal mt-8 mb-12">Payment Unsuccessfully</h5>
    <p className="text-center mr-10 ml-10 mb-8">We cannot charge $ 1,540 to your VISA CREDIT CARD XXXX XXXX XXXX 4242.</p>
    <p className="text-center mr-12 ml-12 mb-12">
      This payment is for Weekly Program at Oct 16, 2019
    </p>
    <ErrorIcon />
    <h5 className="text-center font-normal mt-12 mb-12 ml-16 mr-16">Check your account or select another credit / debit card</h5>

  </div>
)


const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/hardware/keyboard_arrow_left_24px">
      <path id="icon/hardware/keyboard_arrow_left_24px_2" d="M15.7049 16.59L11.1249 12L15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59Z" fill="#3B414B" />
    </g>
  </svg>
)

const ErrorIcon = () => (
  <svg width="149" height="149" viewBox="0 0 149 149" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="74.5" cy="74.5" r="72.5" stroke="#FF83A1" strokeWidth="4" />
    <path fillRule="evenodd" clipRule="evenodd" d="M85.6209 65.3803C86.2392 65.9986 86.2392 67.0011 85.6209 67.6194L66.6209 86.6194C66.0026 87.2378 65 87.2378 64.3817 86.6194C63.7634 86.0011 63.7634 84.9986 64.3817 84.3803L83.3817 65.3803C84 64.7619 85.0026 64.7619 85.6209 65.3803Z" fill="#FF83A1" />
    <path fillRule="evenodd" clipRule="evenodd" d="M64.3817 65.3803C65 64.7619 66.0026 64.7619 66.6209 65.3803L85.6209 84.3803C86.2392 84.9986 86.2392 86.0011 85.6209 86.6194C85.0026 87.2378 84 87.2378 83.3817 86.6194L64.3817 67.6194C63.7634 67.0011 63.7634 65.9986 64.3817 65.3803Z" fill="#FF83A1" />
  </svg>

)
