import React from 'react'

interface Props {
  reservation: Reservation
}

export default (props:Props) => {
  const { reservation } = props
  return (
    <div className="p-4">
      <div className="text-2xl font-bold py-4">What you need to know before your trip</div>
      <div>
        <div className="text-xl font-semibold mt-4">Whats included?</div>
        {reservation.program.serviceCoverage.included.map((text: string, index: number) => (
          <div key={`prog${index.toString()}`} className="flex items-center">
            <div><IconIncluded /></div>
            <div className="ml-4 py-2 font-thin text-sm">{text}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-xl font-semibold mt-4">Whats not included?</div>
        {reservation.program.serviceCoverage.notIncluded.map((text: string, index: number) => (
          <div key={`prog${index.toString()}`} className="flex items-center">
            <div><IconNotIncluded /></div>
            <div className="ml-4 py-2 font-thin text-sm">{text}</div>
          </div>
        ))}
      </div>
      {reservation.program.preTripInfo.map((info:ProgramContentText, index: number) => (
        <div key={`info${index.toString()}`}>
          <div className="text-xl font-semibold mt-4">{info.title}</div>
          <div className="text-sm font-thin mt-2 text-justify antialiased">{info.text}</div>
        </div>
      ))}
    </div>
  )
}

const IconIncluded = () => (
  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.53809 17.9297C14.4424 17.9297 18.5029 13.8691 18.5029 8.96484C18.5029 4.06934 14.4336 0 9.5293 0C4.63379 0 0.573242 4.06934 0.573242 8.96484C0.573242 13.8691 4.64258 17.9297 9.53809 17.9297ZM9.53809 16.4355C5.38965 16.4355 2.07617 13.1133 2.07617 8.96484C2.07617 4.8252 5.38086 1.49414 9.5293 1.49414C13.6777 1.49414 17 4.8252 17.0088 8.96484C17.0176 13.1133 13.6865 16.4355 9.53809 16.4355ZM8.43066 13.3594C8.7207 13.3594 8.95801 13.2188 9.14258 12.9463L13.4844 6.11719C13.5986 5.94141 13.6953 5.73926 13.6953 5.5459C13.6953 5.1416 13.3438 4.89551 12.9746 4.89551C12.7461 4.89551 12.5176 5.02734 12.3594 5.29102L8.39551 11.6455L6.35645 9.00879C6.1543 8.74512 5.94336 8.64844 5.70605 8.64844C5.31934 8.64844 5.01172 8.96484 5.01172 9.36035C5.01172 9.55371 5.09082 9.73828 5.22266 9.90527L7.6748 12.9463C7.91211 13.2363 8.14062 13.3594 8.43066 13.3594Z" fill="#EDF2F7" />
  </svg>
)

const IconNotIncluded = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.96484 17.9297C13.8691 17.9297 17.9297 13.8691 17.9297 8.96484C17.9297 4.06934 13.8604 0 8.95605 0C4.06055 0 0 4.06934 0 8.96484C0 13.8691 4.06934 17.9297 8.96484 17.9297ZM8.96484 16.4355C4.81641 16.4355 1.50293 13.1133 1.50293 8.96484C1.50293 4.8252 4.80762 1.49414 8.95605 1.49414C13.1045 1.49414 16.4268 4.8252 16.4355 8.96484C16.4443 13.1133 13.1133 16.4355 8.96484 16.4355ZM5.95898 12.6914C6.15234 12.6914 6.33691 12.6123 6.45996 12.4717L8.95605 9.9668L11.4609 12.4717C11.5928 12.6035 11.7598 12.6914 11.9619 12.6914C12.3486 12.6914 12.665 12.3662 12.665 11.9795C12.665 11.7773 12.5947 11.6104 12.4541 11.4785L9.95801 8.98242L12.4629 6.46875C12.6123 6.31934 12.6738 6.16992 12.6738 5.97656C12.6738 5.58105 12.3574 5.27344 11.9707 5.27344C11.7861 5.27344 11.6367 5.33496 11.4873 5.48438L8.95605 7.99805L6.44238 5.49316C6.31934 5.35254 6.15234 5.29102 5.95898 5.29102C5.57227 5.29102 5.25586 5.58984 5.25586 5.98535C5.25586 6.17871 5.32617 6.3457 5.4668 6.47754L7.96289 8.98242L5.4668 11.4873C5.32617 11.6104 5.25586 11.7861 5.25586 11.9795C5.25586 12.3662 5.57227 12.6914 5.95898 12.6914Z" fill="#EDF2F7" />
  </svg>

)
