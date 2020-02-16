import React from 'react'

interface Props {
  reservation: Reservation
}

export default (props:Props) => {
  const { reservation } = props
  return (
    <div className="p-4">
      <div className="text-2xl font-bold py-4">Recommended tackle and gear for your trip</div>
      {reservation.program.gear.map((gear:Gear, index: number) => (
        <div key={`info${index.toString()}`}>
          <div className="text-xl font-semibold mt-8">{gear.title}</div>
          <div className="text-sm font-thin mt-2 text-justify antialiased">{gear.description}</div>
          <div className="flex mt-8x">
            {gear.photo.map((url:string) => (
              <div key={url} className="h-32 w-32 mt-4">
                <img src={url} alt="img" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
