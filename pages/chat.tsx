import React from 'react'

interface NavigationTop {
    title:string
  }
interface BotChat {
    description:string
    date:string
  }
interface UserChat {
    description:string
    date:string
  }

const NavigationTop = (props:NavigationTop) => {
  const { title } = props
  return (
    <div className="navigation ml-4 mb-8  mt-8 mr-4">
      <ArrowLeft />
      <h5 className="text-center">{title}</h5>
      <style jsx>
        {`.navigation{
            display:grid;
            grid-template-columns:30px 3fr;    
            }
        
            `}

      </style>
    </div>
  )
}

const BotChat = (props:BotChat) => {
  const { description, date } = props
  return (
    <div className="callChatBot ml-4 mb-4  mr-4">

      <div className="bg-red-300 text-white p-2 mr-2 rounded-lg">
        <p>{description}</p>
        <span className="date text-red-500">{date}</span>
      </div>
      <div className="bg-gray-600  avatar text-white p-2 text-center rounded-full w-10 h-10 ">A</div>
      <style jsx>
        {`.callChatBot{
              display:grid;
              grid-template-columns:3fr 40px;    
              }
              .avatar{
                margin: 100% 0% 0% 0%;
              }
              `}

      </style>
    </div>
  )
}

const UserChat = (props:UserChat) => {
  const { description, date } = props
  return (
    <div className="callChatBot ml-4 mb-4  mr-4">
      <div className="bg-gray-600 avatar text-white p-2 text-center rounded-full w-10 h-10">A</div>
      <div className="bg-gray-300 text-gray p-2 ml-2 rounded-lg">
        <p>{description}</p>
        <span className="date text-red-500">{date}</span>
      </div>
      <style jsx>
        {`.callChatBot{
                display:grid;
                grid-template-columns:40px 3fr;    
                }
                .avatar{
                    margin: 100% 0% 0% 0%;
                  }
                `}

      </style>
    </div>
  )
}

export default () => (
  <div>
    <NavigationTop title="Contact Name" />
    <BotChat description="Message goes here, message goes here, message goes here " date="Send - 17 nov., 2019 11:34 am " />
    <UserChat description="Message goes here, message goes here, message goes here " date="Send - 17 nov., 2019 11:34 am " />

    <div className="sendText ">

      <input type="text" placeholder="Jurasic Lake" />
      <button className="ml-2 mt-2">
        <SendIcon />
      </button>
    </div>
    <style jsx>
      {
        `.sendText{
            background: #E2E8F0;
            border-radius: 4px;
          border-width: 0px;
          margin-bottom: 5px;
          border: 0.3px solid #CBD5E0;
          -webkit-appearance: none;
             -moz-appearance: none;
                  appearance: none;
          width: 100%;
          height:36px;
          position: fixed;
          bottom:0px;
        }
        input{
            background: #E2E8F0;
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


const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icon/hardware/keyboard_arrow_left_24px">
      <path id="icon/hardware/keyboard_arrow_left_24px_2" d="M15.7049 16.59L11.1249 12L15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59Z" fill="#3B414B" />
    </g>
  </svg>
)

const SendIcon = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.652344" width="17.341" height="16" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#image0" transform="translate(0 -0.0419073) scale(0.03125 0.0338692)" />
      </pattern>
      <image id="image0" width="32" height="32" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADukAAA7pAQ4zQhwAAAAHdElNRQfjBw8UBRdTzHXkAAACEklEQVRIx+3SS0gUUBgF4G/UCkorEgmlh9E7TdKcqFyEEFRQ2aICFxUGBkEghBBJkNQmjBZmYLmUIhGKyKKFPUmoCFtEFBWCIGWCaTllYNS0cNBRx7HHtrO6957/nPvfc3/+458R+GvlDPmC5vypwVSrBAXlWyKAZ0m/JZtkpaB8QVnaPfVdqoBOP9XHF2bYpVqLfu81qbRNmuXq/RDWLEe/2bFkC+xW5Z4+3W45Ybv0CLPYRX26DSgXUOZ6tGymjSo16RLSotpeWSMinueCry67q9160GonFKhwVYdvHquxzwoJY3qa67yQc3Zo02AGyNZjyqBPWJM8k8bJIV21kDrzlfukdOi8Su3gIsEubR4pjCFOdUpIo8XS3PRSzhCToMO64cLJDujUbHWUeJZKvRotRaF36k2LYjd5O3oIpzmiR6MlSHZEr2a5SFSpV/Go3i45Fuu9qU7rc0W3JnmR+B56YsGouhQhmeMNzxztSiLrIt2qYsRb4r44aHAISc7qsjlmxT374xlUqMNWYc0yYvCZvpg+/B1j8VwOipzR6oWyMTV7XNMXr4N5vkjSaQ0KvHHHwig24LVNw9tYHXT4rljYUyySakCrwxIj7FrJbpsAD7xSJ8MNbTYg1zOPZYNaVRPJqRHW4KOaoelLctRnx6XoiRjFRalw5O5oLNPig9aJ5SxycsTkDyd20JbfMfiPP8IvVduLW4QAFYoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDctMTVUMTg6MDU6MjMrMDI6MDCbMqwlAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA3LTE1VDE4OjA1OjIzKzAyOjAw6m8UmQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" />
    </defs>
  </svg>
)
