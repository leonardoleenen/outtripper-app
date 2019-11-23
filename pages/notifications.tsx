import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { StoreData } from '../redux/store'
import bs from '../services/business'
import BottomNavBar from '../components/agency_bottom_nav_bar'

interface RowProps {
  hasReaded:boolean
  message:string
  date:string
}

interface RowChatRoomProps {
  hasReaded:boolean
  title:string
  date:string
  message:string
}

const Row = (props:RowProps) => {
  const { hasReaded, message, date } = props
  return (
    <div className={`flex flex-row items-center pt-4 lineBottom pb-4 ${hasReaded ? ' bg-gray-200' : ''}`}>
      {hasReaded}
      <div className="flex flex-col ml-4 mr-4">
        <p className="mr-1">{message}</p>
        <span className="date mt-6 ">{date}</span>
      </div>

    </div>
  )
}

const RowChatRoom = (props:RowChatRoomProps) => {
  const {
    hasReaded, title, date, message,
  } = props
  return (
    <div className="content  pb-2 lineBottom pb-4 ">
      <img src="https://pbs.twimg.com/profile_images/594370331013476352/3us0t8bB_400x400.jpg" alt="" className="rounded-full avatarSmall ml-4" />
      {hasReaded}
      <div className="flex flex-col ml-2 mr-4">
        <h5>{title}</h5>
        <p>{message}</p>

      </div>
      <span className="date mt-2 ">{date}</span>
      <ChevronIcon />
      <style jsx>
        {
        `
        .content{
          display:grid;;
          grid-template-columns:65px 3fr 1fr 20px;
        }
       
        `
      }

      </style>

    </div>
  )
}


const Search = () => (
  <div className="searchByText ml-4 mr-4">
    <button className="ml-2">
      <SearchIcon />
    </button>
    <input type="text" placeholder="Search" />

    <style jsx>
      {
        `.searchByText{
          background: #F7FAFC;;
          border-radius: 3px;
          border-width: 0px;
          margin-bottom: 1.5rem;
          border: 0.3px solid #CBD5E0;
          -webkit-appearance: none;
             -moz-appearance: none;
                  appearance: none;
          width: 90%;
          height:30px;
        }
        input{
          background: #F7FAFC;
          text-indent: 15px;
          width: 90%;
          font-size: 14px;
          line-height: 25px;
          letter-spacing: 0.15px;
        }
        input:focus{outline:0px;}
        svg{margin-top:10px}
        `
      }

    </style>

  </div>
)


export default () => {
  const user: User = useSelector((state:StoreData) => state.loggedUser.user)
  const [notifications, setNotifications] = useState([])


  function reactToChanges() {
    bs.da.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
      console.log(change)
    }).on('error', console.log.bind(console))
  }


  const fetchNotificactions = async () => {
    setNotifications(await bs.getNotifications(user))
  }

  useEffect(() => {
    fetchNotificactions() // Initial Load
    bs.getNotifications(user).then(reactToChanges).catch(console.log.bind(console))
  }, [])


  return (
    <div>

      <h2 className="ml-4 mb-4 mt-12 mr-4">Notifications</h2>
      <Search />

      <div className="tabs  ">
        <input type="radio" defaultChecked name="tab" id="tab1" />
        <label htmlFor="tab1" className="justify-between">Notifications</label>

        <input type="radio" name="tab" id="tab2" />
        <label htmlFor="tab2" className="justify-between">Chat Room</label>

        <div className="tab">
          {notifications.map((n: SystemNotificaction) => (
            <Row
              key={n.id}
              hasReaded={n.hasReaded}
              message={n.message}
              date={moment(n.eventDate).format('Do MM YYYY hh:mm:ss')}
            />
          ))}

          <button
            type="button"
            onClick={() => bs.da.db.post({
              eventDate: 1574246447000, message: 'Prueba', collectionKind: 'notifications', hasReaded: false,
            })}
          >
Prueba
          </button>
        </div>
        <div className="tab">
          <RowChatRoom
            hasReaded={false}
            title="Contact Name"
            date="11:00 a.m."
            message="Last message goes here..."
          />
        </div>


      </div>


      <style jsx>
        {
          `
           div.tabs input{ display:none;  min-width:30%;}
          div.tabs label{ 
            font-weight: normal;
            font-size: 18px;
            line-height: 28px;
            text-align: center;
            letter-spacing: 0.1px;
            color: #718096;
            cursor:pointer;
            padding:15px 25px;
           
            margin:auto;
            margin-left:20px;
          }
          div.tabs input:checked + label{  
            border-bottom:2px solid #FF7D00;
            color: #3B414B;
            font-weight: 600;
          }
          div.tabs div.tab{ display:none; clear:left; margin-top:30px}
          div.tabs input:nth-of-type(1):checked ~ .tab:nth-of-type(1),
          div.tabs input:nth-of-type(2):checked ~ .tab:nth-of-type(2),
          div.tabs input:nth-of-type(3):checked ~ .tab:nth-of-type(3){ display:block;}
         `
        }

      </style>
      <BottomNavBar />
    </div>
  )
}


const SearchIcon = () => (
  <svg
    version="1.1"
    className="h-4 items-center mt-1 ml-1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 52.966 52.966"
  >
    <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
       c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
       C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
       S32.459,40,21.983,40z"
    />

  </svg>
)

const ChevronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" fill="black" fillOpacity="0.54" />
  </svg>
)
