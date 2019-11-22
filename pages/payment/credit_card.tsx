import React from 'react'

interface InputText {
  label: string
  placeholder: string
}
interface InputCheck {
  label: string
}
interface InputTextDisabled {
  label: string
  value: string
}
interface CreditCard {
  cardHolder: string
  expired: string
  numberCard: string
}

const NavigationTop = () => (
  <div className="navigationTop ml-4 mb-8  pt-8 mr-4">
    <BackIcon />
    <div />
    <ShareIcon />

  </div>
)
const InputCheck = (props: InputCheck) => {
  const { label } = props
  return (
    <div className="mb-8 mt-4">
      <label className="InputCheckbox block relative mb-12 ml-4 mr-4 font-normal ">
        {label}
        <input type="checkbox" className="absolute h-0 w-0 opacity-0" />
        <span className="checkmark absolute bg-white " />
      </label>

    </div>
  )
}


const InputText = (props: InputText) => {
  const { label, placeholder } = props
  return (
    <div className=" pb-1 mb-4 mx-4 bg-white  shadow-xl rounded input   ">
      <label className=" flex px-4 pt-2 pb-1 items-center font-normal    ">{label}</label>
      <input type="Text" className=" mx-4 mb-2 font-light flex items-center bg-transparent  " placeholder={placeholder} />

      <style jsx>
        {`
           
            label{
                font-size: 11px;
                line-height: 15px;
                color: #9B9B9B
            }
            input{
              font-size: 14px;
              line-height: 25px;
              letter-spacing: 0.15px;
              color: #2D2D2D;
              width:90%;
            }
            input:focus{outline:0px;}
          `}

      </style>

    </div>

  )
}

const CreditCard = (props: CreditCard) => {
  const { cardHolder, expired, numberCard } = props
  return (
    <div className="credit-card text-white rounded-lg shadow-xl flex flex-col justify-between ml-4 mr-4 mb-8 p-4 mt-4">
      <div className="credit-card__info  flex justify-between">
        <div className="credit-card__info_name">
          <VisaIcon />
        </div>

        <div className="credit-card__info_expiry flex flex-col items-end">
          <MoreIcon />
        </div>
      </div>

      <div className="credit-card__number flex justify-center">{numberCard}</div>

      <div className="credit-card__info  flex justify-between">
        <div className="credit-card__info_name">
          <p className="text-white uppercase">Card holder</p>
          <div className="etiquet">{cardHolder}</div>
        </div>

        <div className="credit-card__info_expiry flex flex-col items-end">
          <p className="text-white uppercase">Expires</p>
          <div className="etiquet">{expired}</div>
        </div>
      </div>
      <style jsx>
        {
          `.credit-card {
              height: 200px;
              background: linear-gradient(121.05deg, #8676FB 0%, #AB7BFF 100%);
          }
          
          .credit-card__number {
              font-size: 20px;
              line-height: 26px;
              letter-spacing: 5px
          }
          
          .credit-card__info {
              font-size: 25px;
          }
          
          .etiquet{font-weight: 500;
            font-size: 16px;
            line-height: 24px;
           text-align: right;
            letter-spacing: 0.1px;}
        `
        }
      </style>

    </div>

  )
}

const InputTextDisabled = (props: InputTextDisabled) => {
  const { label, value } = props
  return (
    <div className="pb-1 mb-4 mx-4 bg-white  shadow-xl rounded  ">
      <label className=" px-4 pt-2 pb-1">{label}</label>
      <input type="Text" className=" mx-4 mb-2 " value={value} disabled />
      <style jsx>
        {`
           
            label{
                font-size: 11px;
                line-height: 15px;
                color: #9B9B9B
            }
            input{
              font-size: 14px;
              line-height: 25px;
              letter-spacing: 0.15px;
              color: #2D2D2D;
              width:90%;
            }
            input:focus{outline:0px;}
          `}

      </style>

    </div>

  )
}

export default () => (
  <div className="bg-gray-200 flex flex-col pb-8 ">
    <NavigationTop />

    <ul className="flex border-b ml-4 mr-4 mb-4">
      <li className="-mb-px mr-1">
        <a className="text-center rounded-none font-normal inline-block  py-2 px-4 activedTabs " href="credit_card">Credit Card</a>
      </li>
      <li className="mr-1">
        <a className=" text-center rounded-none font-normal inline-block py-2 px-4 " defaultChecked href="wire_transfer">Wire transfer</a>
      </li>

    </ul>

    <CreditCard cardHolder="MATT SMITH" expired="06/2027" numberCard="**** **** **** 2516" />

    <InputText label="Card Holder" placeholder="1234123412341234" />
    <div className="content2Column">
      <InputText label="Due Date" placeholder="MMYY" />
      <InputText label="CVC" placeholder="123" />
      <InputTextDisabled label="Amount" value="$ 123.00" />

    </div>


    <InputCheck label="I agree with terms and conditions " />

    <button className="bg-blue-500   mb-6 m-auto  uppercase focus:outline-none hover:bg-blue-700 text-white  py-2 px-4 mb-8 rounded">
      Proceed
    </button>


    <style jsx>
      {
        `li{
            width:49%;
            }
          a{
            font-size: 18px;
            line-height: 28px;
            letter-spacing: 0.1px;
            color: #718096;
            }
          `
      }
    </style>
  </div>
)
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/hardware/keyboard_arrow_left_24px">
      <path id="icon/hardware/keyboard_arrow_left_24px_2" d="M15.7049 16.59L11.1249 12L15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59Z" fill="#3B414B" />
    </g>
  </svg>
)

const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/share">
      <path id="Mask" fillRule="evenodd" clipRule="evenodd" d="M18 19C17.448 19 17 18.552 17 18C17 17.448 17.448 17 18 17C18.552 17 19 17.448 19 18C19 18.552 18.552 19 18 19ZM5 13C4.448 13 4 12.552 4 12C4 11.448 4.448 11 5 11C5.552 11 6 11.448 6 12C6 12.552 5.552 13 5 13ZM18 5C18.552 5 19 5.448 19 6C19 6.552 18.552 7 18 7C17.448 7 17 6.552 17 6C17 5.448 17.448 5 18 5ZM18 15C17.183 15 16.443 15.33 15.901 15.861L7.966 12.335C7.979 12.224 8 12.114 8 12C8 11.886 7.979 11.776 7.966 11.665L15.901 8.139C16.443 8.67 17.183 9 18 9C19.654 9 21 7.654 21 6C21 4.346 19.654 3 18 3C16.346 3 15 4.346 15 6C15 6.114 15.021 6.224 15.034 6.335L7.099 9.861C6.557 9.33 5.817 9 5 9C3.346 9 2 10.346 2 12C2 13.654 3.346 15 5 15C5.817 15 6.557 14.67 7.099 14.139L15.034 17.665C15.021 17.776 15 17.886 15 18C15 19.654 16.346 21 18 21C19.654 21 21 19.654 21 18C21 16.346 19.654 15 18 15Z" fill="#718096" />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="3" width="19" height="18">
        <path id="Mask_2" fillRule="evenodd" clipRule="evenodd" d="M18 19C17.448 19 17 18.552 17 18C17 17.448 17.448 17 18 17C18.552 17 19 17.448 19 18C19 18.552 18.552 19 18 19ZM5 13C4.448 13 4 12.552 4 12C4 11.448 4.448 11 5 11C5.552 11 6 11.448 6 12C6 12.552 5.552 13 5 13ZM18 5C18.552 5 19 5.448 19 6C19 6.552 18.552 7 18 7C17.448 7 17 6.552 17 6C17 5.448 17.448 5 18 5ZM18 15C17.183 15 16.443 15.33 15.901 15.861L7.966 12.335C7.979 12.224 8 12.114 8 12C8 11.886 7.979 11.776 7.966 11.665L15.901 8.139C16.443 8.67 17.183 9 18 9C19.654 9 21 7.654 21 6C21 4.346 19.654 3 18 3C16.346 3 15 4.346 15 6C15 6.114 15.021 6.224 15.034 6.335L7.099 9.861C6.557 9.33 5.817 9 5 9C3.346 9 2 10.346 2 12C2 13.654 3.346 15 5 15C5.817 15 6.557 14.67 7.099 14.139L15.034 17.665C15.021 17.776 15 17.886 15 18C15 19.654 16.346 21 18 21C19.654 21 21 19.654 21 18C21 16.346 19.654 15 18 15Z" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect id="Base" width="24" height="24" fill="#718096" />
        </g>
      </g>
    </g>
  </svg>
)

const VisaIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path d="M16.0172 14.0479L13.9844 25.9774H17.2356L19.2702 14.0479H16.0172Z" fill="white" />
      <path d="M11.2582 14.0611L8.07389 22.1967L7.73438 20.9683C7.10637 19.4882 5.32354 17.3625 3.23047 16.0229L6.14221 25.9715L9.58244 25.9656L14.7026 14.0586L11.2582 14.0611Z" fill="white" />
      <path d="M6.49914 14.915C6.31016 14.1883 5.76243 13.9717 5.08258 13.9458H0.0418113L0 14.1833C3.92273 15.1349 6.51838 17.4278 7.59543 20.1849L6.49914 14.915Z" fill="white" />
      <path d="M25.859 16.3347C26.9227 16.318 27.6937 16.5505 28.2924 16.7913L28.5859 16.9293L29.0258 14.3437C28.3819 14.102 27.3726 13.8428 26.1132 13.8428C22.9004 13.8428 20.6359 15.4609 20.6184 17.7797C20.5975 19.4931 22.2314 20.4498 23.4657 21.0209C24.7326 21.6063 25.1574 21.9784 25.1515 22.5011C25.1415 23.2996 24.1414 23.6659 23.2073 23.6659C21.9053 23.6659 21.2138 23.4861 20.1459 23.0413L19.7269 22.8506L19.2695 25.5207C20.0305 25.8543 21.4345 26.1411 22.8921 26.1562C26.3097 26.1562 28.5307 24.5573 28.5541 22.0796C28.5684 20.7241 27.7012 19.6897 25.8222 18.8409C24.6849 18.2873 23.9892 17.9194 23.9959 17.3608C23.9959 16.8649 24.5863 16.3347 25.859 16.3347Z" fill="white" />
      <path d="M37.3711 14.061H34.859C34.0788 14.061 33.4985 14.2734 33.1557 15.0511L28.3281 25.9839H31.7424C31.7424 25.9839 32.2994 24.5139 32.4256 24.1919C32.7994 24.1919 36.1167 24.1969 36.5892 24.1969C36.6862 24.6134 36.9856 25.9839 36.9856 25.9839H40.0018L37.3711 14.061ZM33.3614 21.7501C33.629 21.0653 34.6567 18.4161 34.6567 18.4161C34.6391 18.4487 34.9218 17.7262 35.0898 17.2772L35.3089 18.3057C35.3089 18.3057 35.9319 21.1539 36.0624 21.7501H33.3614Z" fill="white" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="white" />
  </svg>
)
