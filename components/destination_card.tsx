import React from 'react'

export default () => (
  <div>
    <div className="card rounded overflow-hidden shadow-lg">
      <img className="w-full rounded " src="https://tailwatersflyfishing.com/wp-content/uploads/2014/03/tsimane-bolivia-0289-1.jpg" alt="" />
      <div className=" content ">
        <div className="m-auto m-top">
          <LocationIcon />
        </div>
        <div>
          <h1>Tsimane Lodge</h1>
          <h3>Bolivia, Beni</h3>
        </div>

        <div className="m-auto m-top">
          <MoreIcon />
        </div>

      </div>
    </div>


    <style jsx>
      {
        `
        @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

          .card{
            width:98%;
            margin:auto;
            margin-bottom:30px;
            position: relative;
          }
          .card img{
            width:100%;
            margin:auto;
            border-radius: 4px;
            box-shadow: 0px 15px 38px rgba(0, 0, 0, 0.3), 0px 4px 4px rgba(0, 0, 0, 0.25);

          }
          .content{
            position:absolute;
            background: #000;
            opacity: 0.75;
            border-radius: 4px;
            color: #fff;
            width: 100%;
            bottom: 0px;
            display:grid;
            grid-template-columns:35px 3fr 35px;
          }
          h1{
            font-family: Open Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            line-height: 27px;
            letter-spacing: 0.15px;
            color: #FFFFFF;
            margin-top:8px;
            margin-bottom:0px

          }
          h3{
            font-family: Open Sans;
            font-style: normal;
            font-weight: 300;
            font-size: 9px;
            line-height: 12px;
            letter-spacing: 0.15px;
            color: #FFFFFF;
            margin-top:4px;
            margin-bottom:8px;
          }
          .m-top{
            margin-top:12px;
          }
          
          
            `
      }

    </style>
  </div>
)

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 7.33268C7.44867 7.33268 7 6.88401 7 6.33268C7 5.78134 7.44867 5.33268 8 5.33268C8.55133 5.33268 9 5.78134 9 6.33268C9 6.88401 8.55133 7.33268 8 7.33268ZM8 3.99934C6.71333 3.99934 5.66667 5.04601 5.66667 6.33268C5.66667 7.61934 6.71333 8.66601 8 8.66601C9.28667 8.66601 10.3333 7.61934 10.3333 6.33268C10.3333 5.04601 9.28667 3.99934 8 3.99934ZM8 13.097C6.88333 12.041 4 9.07634 4 6.61434C4 4.43767 5.794 2.66634 8 2.66634C10.206 2.66634 12 4.43767 12 6.61434C12 9.07634 9.11667 12.041 8 13.097ZM8 1.33301C5.05933 1.33301 2.66667 3.70167 2.66667 6.61434C2.66667 10.2643 7.366 14.3337 7.566 14.505C7.69133 14.6123 7.84533 14.6663 8 14.6663C8.15467 14.6663 8.30867 14.6123 8.434 14.505C8.634 14.3337 13.3333 10.2643 13.3333 6.61434C13.3333 3.70167 10.9407 1.33301 8 1.33301Z" fill="white" />
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="1" width="12" height="14">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 7.33268C7.44867 7.33268 7 6.88401 7 6.33268C7 5.78134 7.44867 5.33268 8 5.33268C8.55133 5.33268 9 5.78134 9 6.33268C9 6.88401 8.55133 7.33268 8 7.33268ZM8 3.99934C6.71333 3.99934 5.66667 5.04601 5.66667 6.33268C5.66667 7.61934 6.71333 8.66601 8 8.66601C9.28667 8.66601 10.3333 7.61934 10.3333 6.33268C10.3333 5.04601 9.28667 3.99934 8 3.99934ZM8 13.097C6.88333 12.041 4 9.07634 4 6.61434C4 4.43767 5.794 2.66634 8 2.66634C10.206 2.66634 12 4.43767 12 6.61434C12 9.07634 9.11667 12.041 8 13.097ZM8 1.33301C5.05933 1.33301 2.66667 3.70167 2.66667 6.61434C2.66667 10.2643 7.366 14.3337 7.566 14.505C7.69133 14.6123 7.84533 14.6663 8 14.6663C8.15467 14.6663 8.30867 14.6123 8.434 14.505C8.634 14.3337 13.3333 10.2643 13.3333 6.61434C13.3333 3.70167 10.9407 1.33301 8 1.33301Z" fill="white" />
    </mask>
    <g mask="url(#mask0)">
      <rect width="16" height="16" rx="4" fill="white" />
    </g>
  </svg>
)

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12Z" fill="white" />
  </svg>
)
