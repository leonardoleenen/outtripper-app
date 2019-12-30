import React from 'react'
import Page from '../../components/reservation/page'

export default () => (
  <Page back={null} next="label" label="Fullweek Program" title="Reserve this program to">
    <div className="mx-4 mt-12 flex">
      <div className="font-thin text-sm">Add a contact from your contact list</div>
      <IconAdd />
    </div>
  </Page>
)


const IconAdd = () => (
  <svg className="ml-12" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/content/add_circle_outline_24px">
      <path id="icon/content/add_circle_outline_24px_2" fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 7V11H7V13H11V17H13V13H17V11H13V7H11ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z" fill="white" />
    </g>
  </svg>
)
