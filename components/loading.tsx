import React from 'react'

export default () => (
  <div className="bg-gradient">
    <div className="m-auto">
      <div className="loadingIcon">
        <LoadingIcon />
      </div>
      <p>This task maybe take a few seconds, Please wait and you will be awared</p>
    </div>

    <style>
      {
        `

         .bg-gradient{
            background: linear-gradient(179.96deg, #F56565 2.18%, #E53E3E 27.54%, #C53030 52.38%, #9B2C2C 98.95%);
            height:100vh;
            color:#fff;
            text-align:center;
          }
          p{
            font-family: Open Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 22px;
            text-align:center;
            width:70%;
            margin:auto;
          }
          .loadingIcon{
            margin:auto;
            padding-top:23%;
           
          }
            `
      }

    </style>
  </div>
)

const LoadingIcon = () => (
  <svg
    version="1.1"
    id="loadingIcon"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    height="200px"
    width="200px"
    viewBox="0 0 100 100"
  >
    <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="1s"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      />
    </path>
  </svg>
)
