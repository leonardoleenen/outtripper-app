import React from 'react'

interface InputText {
  label: string
}
interface InputCheck {
  label: string
}
interface InputTextDisabled {
  label: string
  value: string
}
const NavigationTop = () => (
  <div className="navigation ml-4 mb-8  pt-8 mr-4">
    <BackIcon />
    <div />
    <ShareIcon />

    <style jsx>
      {`.navigation{
              display:grid;
              grid-template-columns:30px 3fr 30px;    
              }
          
              `}

    </style>
  </div>
)
const InputCheck = (props: InputCheck) => {
  const { label } = props
  return (
    <div className="mt-4">
      <label className="container ml-4 mr-4">
        {label}
        <input type="checkbox" />
        <span className="checkmark" />
      </label>
      <style jsx>
        {
          `.container {
            display: block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            font-family: Open Sans;
font-style: normal;
font-weight: 300;
font-size: 14px;
line-height: 25px;
width:90%;
          }
          
          .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }
          
          .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 25px;
            width: 25px;
            background-color: #fff;
            border:1px solid #fff;
          }
          .container:hover input ~ .checkmark {
            border: 1px solid #fff;
          }
          .container input:checked ~ .checkmark {
            background-color: #2196F3;
          }
          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
          }
          .container input:checked ~ .checkmark:after {
            display: block;
          }
          .container .checkmark:after {
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }`
        }
      </style>
    </div>
  )
}


const InputText = (props: InputText) => {
  const { label } = props
  return (
    <div className="contentInput pb-1 mb-4 mr-4 ml-4  ">
      <label className=" px-4 pt-2 pb-1">{label}</label>
      <input type="Text" className=" mx-4 mb-2 " />

      <style jsx>
        {`
            .contentInput{
                background: #FFFFFF;
                box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05);
                border-radius: 4px;
            }
            label{
                font-family: Open Sans;
                font-style: normal;
                font-weight: normal;
                font-size: 11px;
                line-height: 15px;
               display: flex;
                align-items: center;
                color: #9B9B9B
            }
            input{
              background: transparent;
              font-weight: 300;
              font-size: 14px;
              line-height: 25px;
              display: flex;
              align-items: center;
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

const InputTextDisabled = (props: InputTextDisabled) => {
  const { label, value } = props
  return (
    <div className="contentInput pb-1 mb-4 mr-4 ml-4 w-2/4">
      <label className=" px-4 pt-2 pb-1">{label}</label>
      <input type="Text" className=" mx-4 mb-2 " value={value} disabled />

      <style jsx>
        {`
            .contentInput{
                background: #FFFFFF;
                box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05);
                border-radius: 4px;
            }
            label{
                font-family: Open Sans;
                font-style: normal;
                font-weight: normal;
                font-size: 11px;
                line-height: 15px;
               display: flex;
                align-items: center;
                color: #9B9B9B
            }
            input{
              background: transparent;
              font-weight: 300;
              font-size: 14px;
              line-height: 25px;
              display: flex;
              align-items: center;
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
  <div className="bg-gray-200 h-screen">
    <NavigationTop />

    <ul className="flex border-b ml-4 mr-4 mb-4">
      <li className="-mb-px mr-1">
        <a className=" inline-block  py-2 px-4 " href="credit_card">Credit Card</a>
      </li>
      <li className="mr-1">
        <a className="inline-block actived py-2 px-4 " defaultChecked href="wire_transfer">Wire transfer</a>
      </li>

    </ul>
    <InputText label="Date" />
    <InputText label="Bank" />
    <InputTextDisabled label="Amount" value="$ 123.00" />
    <InputCheck label="I agree with terms and conditions " />

    <button className="bg-blue-500 left bottom-0   uppercase absolute  hover:bg-blue-700 text-white  py-2 px-4 mx-auto rounded">
      Proceed
    </button>


    <style jsx>
      {
        `
            li{
                width:49%;
            }
            a{font-family: Open Sans;
                font-style: normal;
                font-weight: 600;
                font-size: 18px;
                line-height: 28px;
                text-align: center;
                letter-spacing: 0.1px;
                color: #718096;
                border-radius: 0px}
                
            .actived{
                border-bottom:2px solid #FF7D00;
                background:transparent;
                color: #3B414B;
                font-weight:600;
            }
            .left{left:35%}
            button:focus{
              outline:0px;
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
