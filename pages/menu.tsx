import React from 'react'

interface Row {
    title:string
  }

  interface Avatar {
    user:string
    message:string
  }
const Row = (props:Row) => {
  const { title } = props
  return (
    <div className=" ml-4 mt-4  mr-4">
      <p className="text-white font-light">{title}</p>
    </div>
  )
}
const Avatar = (props:Avatar) => {
  const {
    user, message,
  } = props
  return (
    <div className="content m-auto pb-8 ">
      <img src="https://pbs.twimg.com/profile_images/594370331013476352/3us0t8bB_400x400.jpg" alt="" className="rounded-full w-24 m-auto" />

      <div className="flex flex-col ml-2 mr-4 text-center text-white">
        <h6 className="text-white font-semibold mt-4">{user}</h6>
        <p className="text-xs">{message}</p>

      </div>


    </div>
  )
}


export default () => (
  <div className="bg-gradient p-8">
    <Avatar user="Leonardo G. Leenen" message="Owner" />
    <Row title="Programs Management" />
    <Row title="Notifications" />

    <Row title="Account Settings" />
    <Row title="Bookings" />
    <Row title="Help Center" />
    <Row title="Payment" />
    <Row title="Contacts" />
    <Row title="Profile" />
    <Row title="Invoices" />
    <Row title="New Quick Program" />
    <Row title="MarketPlace" />
    <Row title="Questionnaire setup" />
    <Row title="Notifications Setup" />
    <Row title="Become Premium" />


  </div>
)
