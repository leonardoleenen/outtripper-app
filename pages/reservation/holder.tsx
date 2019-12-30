import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Page from '../../components/reservation/page'
import { setCallingPage, setHolderIsAPartyMember } from '../../redux/actions/contact_calendar'


export default () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isPartyMember, setIsPartyMemeber] = useState(true)
  const holder : Contact = useSelector((state) => state.contactCalendar.contactSelected)
  return (
    <Page back={null} label="Fullweek Program" title="Reserve this program to">
      {!holder
        ? (
          <div
            className="mx-4 mt-12 flex"
            onClick={() => {
              dispatch(setCallingPage('/reservation/holder'))
              router.push('/contact_list')
            }}
          >
            <div className="font-thin text-sm">Add a contact from your contact list</div>
            <IconAdd />
          </div>
        )
        : (
          <div className="flex py-4  my-8 border-t mx-4 border-b ">
            <div className="flex-cols w-10/12 mx-4 ">
              <div className={`font-semibold text-xl ${isPartyMember ? 'text-white' : 'text-gray-500'}`}>
                {`${holder.lastName}, ${holder.firstName}`}
              </div>
              <div className={`font-thin text-sm  ${isPartyMember ? 'text-white' : 'text-gray-500'}`}>{holder.email}</div>
            </div>
            <div className="flex-cols">

              <div className="text-xs mb-2">Is a Party member?</div>
              <div className={`w-2/4 rounded-r-full rounded-l-full border flex ${isPartyMember ? 'justify-start' : ' justify-end'}`}>
                <div
                  className="h-6 w-6 bg-white rounded-full flex items-center"
                  onClick={() => {
                    setIsPartyMemeber(!isPartyMember)
                    dispatch(setHolderIsAPartyMember(!isPartyMember))
                  }}
                >
                  {isPartyMember ? <IconCheck /> : <IconClose />}

                </div>
              </div>
            </div>
          </div>
        )}

      {holder ? <div className=" ripple right-0 bottom-0 absolute h-16 w-16 mr-8 mb-8 bg-white rounded-full flex items-center" onClick={() => router.push('/reservation/label')}><IconArrow /></div> : ''}


      <style>
        {
            `
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
            `
          }
      </style>
    </Page>
  )
}


const IconAdd = () => (
  <svg className="ml-12" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/content/add_circle_outline_24px">
      <path id="icon/content/add_circle_outline_24px_2" fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 7V11H7V13H11V17H13V13H17V11H13V7H11ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z" fill="white" />
    </g>
  </svg>
)

const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.59631 11.9077L3.46881 8.78016L2.40381 9.83766L6.59631 14.0302L15.5963 5.03016L14.5388 3.97266L6.59631 11.9077Z" fill="#529092" />
  </svg>
)

const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon/Outline/close">
      <path id="Mask" fillRule="evenodd" clipRule="evenodd" d="M13.414 12.0002L17.707 7.70725C18.098 7.31625 18.098 6.68425 17.707 6.29325C17.316 5.90225 16.684 5.90225 16.293 6.29325L12 10.5862L7.70701 6.29325C7.31601 5.90225 6.68401 5.90225 6.29301 6.29325C5.90201 6.68425 5.90201 7.31625 6.29301 7.70725L10.586 12.0002L6.29301 16.2933C5.90201 16.6843 5.90201 17.3162 6.29301 17.7072C6.48801 17.9022 6.74401 18.0002 7.00001 18.0002C7.25601 18.0002 7.51201 17.9022 7.70701 17.7072L12 13.4142L16.293 17.7072C16.488 17.9022 16.744 18.0002 17 18.0002C17.256 18.0002 17.512 17.9022 17.707 17.7072C18.098 17.3162 18.098 16.6843 17.707 16.2933L13.414 12.0002Z" fill="#231F20" />
      <mask id="mask0Close" mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="6" width="14" height="13">
        <path id="Mask_2" fillRule="evenodd" clipRule="evenodd" d="M13.414 12.0002L17.707 7.70725C18.098 7.31625 18.098 6.68425 17.707 6.29325C17.316 5.90225 16.684 5.90225 16.293 6.29325L12 10.5862L7.70701 6.29325C7.31601 5.90225 6.68401 5.90225 6.29301 6.29325C5.90201 6.68425 5.90201 7.31625 6.29301 7.70725L10.586 12.0002L6.29301 16.2933C5.90201 16.6843 5.90201 17.3162 6.29301 17.7072C6.48801 17.9022 6.74401 18.0002 7.00001 18.0002C7.25601 18.0002 7.51201 17.9022 7.70701 17.7072L12 13.4142L16.293 17.7072C16.488 17.9022 16.744 18.0002 17 18.0002C17.256 18.0002 17.512 17.9022 17.707 17.7072C18.098 17.3162 18.098 16.6843 17.707 16.2933L13.414 12.0002Z" fill="white" />
      </mask>
      <g mask="url(#mask0Close)">
        <g id="&#240;&#159;&#142;&#168; Color">
          <rect width="24" height="24" fill="red" />
          <rect id="Base" width="24" height="24" fill="red" />
        </g>
      </g>
    </g>
  </svg>

)

const IconArrow = () => (
  <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.1381 24.5436C13.5152 24.5436 13.8898 24.3796 14.1456 24.0618L20.3817 16.3118C20.7666 15.8326 20.7615 15.148 20.3675 14.6753L13.9092 6.92529C13.4532 6.37762 12.6382 6.30399 12.0892 6.75995C11.5416 7.21591 11.4679 8.03095 11.9252 8.57862L17.7054 15.5162L12.1319 22.4421C11.6849 22.9975 11.7728 23.8112 12.3295 24.2582C12.5671 24.4506 12.8539 24.5436 13.1381 24.5436Z" fill="#539394" />
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="11" y="6" width="10" height="19">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.1381 24.5436C13.5152 24.5436 13.8898 24.3796 14.1456 24.0618L20.3817 16.3118C20.7666 15.8326 20.7615 15.148 20.3675 14.6753L13.9092 6.92529C13.4532 6.37762 12.6382 6.30399 12.0892 6.75995C11.5416 7.21591 11.4679 8.03095 11.9252 8.57862L17.7054 15.5162L12.1319 22.4421C11.6849 22.9975 11.7728 23.8112 12.3295 24.2582C12.5671 24.4506 12.8539 24.5436 13.1381 24.5436Z" fill="white" />
    </mask>
    <g mask="url(#mask0)" />
  </svg>
)
