import React from 'react'
import BottomNavBar from '../../components/agency_bottom_nav_bar'

export default () => (
  <div className="content">
    <BottomNavBar />
    <FreeIcon />
    <h1>Free Date!</h1>
    <p>We don't have any reservation for this date. Make your first reservation right now and save the date</p>
    <style jsx>
      {
          `
         .content{
            margin:auto;
            text-align:center;
            color: #3B414B;
            padding-top:8%;
          }
         p{
          font-family: Open Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 25px;
          text-align: center;
          letter-spacing: 0.15px;
          width:70%;
          margin:auto;
         }
         h1{
          font-family: Open Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 36px;
          line-height: 49px;
          text-align: center;
          letter-spacing: 0.15px;
          
         }

          `
        }

    </style>
  </div>
)

const FreeIcon = () => (
  <svg width="262" height="222" viewBox="0 0 262 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M84.1562 38.4909C86.9317 39.4819 89.5689 39.6078 91.4367 38.8821C90.9586 36.8314 89.3856 34.5791 87.0602 32.6888C87.9931 29.7403 88.1115 26.9387 87.4285 24.9545C85.4981 25.4624 83.3779 27.1334 81.5986 29.6038C78.8231 28.6128 76.1859 28.4869 74.3181 29.2126C74.7963 31.2633 76.3692 33.5156 78.6946 35.4059C77.7618 38.3544 77.6433 41.156 78.3264 43.1402C80.2568 42.6323 82.3769 40.9613 84.1562 38.4909ZM76.2647 77.7413C78.2788 77.9502 80.0731 77.5994 81.2247 76.8023C80.6026 75.5003 79.2138 74.2434 77.3712 73.3546C77.5679 71.215 77.2377 69.3088 76.4873 68.0854C75.2617 68.7463 74.0786 70.2217 73.2419 72.1791C71.2279 71.9702 69.4335 72.321 68.282 73.1181C68.9041 74.4201 70.2929 75.677 72.1355 76.5658C71.9388 78.7054 72.269 80.6116 73.0193 81.835C74.2449 81.1741 75.4281 79.6987 76.2647 77.7413ZM186.194 116.913C184.841 116.53 183.368 115.326 182.144 113.564C180.179 114.225 178.321 114.279 177.015 113.744C177.375 112.307 178.508 110.742 180.167 109.442C179.544 107.354 179.493 105.381 179.997 103.993C181.35 104.376 182.823 105.58 184.047 107.342C186.012 106.681 187.87 106.626 189.176 107.162C188.816 108.599 187.683 110.164 186.024 111.464C186.646 113.551 186.697 115.525 186.194 116.913Z" fill="#D5EDF1" />
    <path fillRule="evenodd" clipRule="evenodd" d="M104.8 51.77V121.075L111.612 121.075V59.5634H150.912V121.075L157.2 121.075V51.77C157.2 48.6957 154.854 46.2034 151.96 46.2034H110.04C107.146 46.2034 104.8 48.6957 104.8 51.77Z" fill="#EEFAFC" />
    <path d="M104.8 121.075H103.3V122.575H104.8L104.8 121.075ZM111.612 121.075L111.612 122.575H113.112V121.075H111.612ZM111.612 59.5634V58.0634H110.112V59.5634H111.612ZM150.912 59.5634H152.412V58.0634H150.912V59.5634ZM150.912 121.075H149.412V122.575H150.912V121.075ZM157.2 121.075V122.575H158.7V121.075H157.2ZM106.3 121.075V51.77H103.3V121.075H106.3ZM111.612 119.575L104.8 119.575L104.8 122.575L111.612 122.575L111.612 119.575ZM113.112 121.075V59.5634H110.112V121.075H113.112ZM111.612 61.0634H150.912V58.0634H111.612V61.0634ZM149.412 59.5634V121.075H152.412V59.5634H149.412ZM157.2 119.575L150.912 119.575V122.575L157.2 122.575V119.575ZM155.7 51.77V121.075H158.7V51.77H155.7ZM151.96 47.7034C153.941 47.7034 155.7 49.4373 155.7 51.77H158.7C158.7 47.954 155.767 44.7034 151.96 44.7034V47.7034ZM110.04 47.7034H151.96V44.7034H110.04V47.7034ZM106.3 51.77C106.3 49.4373 108.059 47.7034 110.04 47.7034V44.7034C106.233 44.7034 103.3 47.954 103.3 51.77H106.3Z" fill="#A3BFC6" />
    <path d="M135.716 52.3267H126.284" stroke="#A3BFC6" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8 10" />
    <path d="M143 40.197C143 26.287 153.387 15 166.212 15C179.038 15 189.424 26.287 189.424 40.197C189.424 51.6271 182.112 60.6778 170.893 64.8719L154.02 70.978C151.235 71.9859 149.349 70.0241 150.255 67.051L152.293 60.3636C146.497 55.6452 143 48.2388 143 40.197Z" fill="white" stroke="#A3BFC6" strokeWidth="3" strokeLinecap="round" />
    <path d="M172.794 38.6671C172.664 38.4436 172.436 38.3079 172.19 38.3033L167.097 38.2089L167.236 29.7054C167.242 29.3406 167.007 29.0207 166.672 28.9387C166.332 28.8551 165.994 29.0359 165.849 29.3658L159.799 43.1725C159.694 43.4087 159.712 43.6874 159.842 43.9079C159.972 44.13 160.2 44.2672 160.446 44.2717L165.54 44.3662L165.4 52.8696C165.394 53.2345 165.629 53.5544 165.964 53.6363C166.014 53.6481 166.065 53.6552 166.115 53.6562C166.397 53.6614 166.663 53.4916 166.787 53.2093L172.838 39.4025C172.94 39.1647 172.926 38.8892 172.794 38.6671Z" fill="#EEFAFC" stroke="#A3BFC6" strokeWidth="3" strokeLinecap="round" />
  </svg>
)
