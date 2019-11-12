export interface MyTripProgram {
    thumbnail: string
    lodge: string
    title: string
    subtitle: string
    from: number
    to: number
  }


  interface MyTripManageAction {
    title: string
    text: string
  }

  interface MyTripPaymentCharge {
    text: string
    amount: number
  }

  interface MyTripPayment {
    title: string
    reservation: string
    invoiceDate: number
    receivedAmount: number
    receivedDate: number
    receivedCard: string
    charges: Array<MyTripPaymentCharge>
  }

export interface MyTripFlightData {
    code: string
    type: string
    flightNumber?: string
    flightStatus?: string
    flightGate?: string
    departureData?: MyTripFlightDataDetail
    arrivalData?: MyTripFlightDataDetail
  }

  interface MyTripFlightDataDetail {
    airportCode: string
    time?: string
  }

  interface MyTripCharterData {
    code: string
    type: string
    title: string
    date: string
    items?: Array<string>
  }

  interface MyTripTransferData {
    code: string
    type: string
    from: string
    to: string
    pickupTime: string
    driver?: MyTripDriver
  }

  interface MyTripDriver {
    firstname: string
    lastname: string
    photo: string
    phone: string
    live: string
  }

  interface MyTripLodgeActivitiesData {
    code: string
    type: string
    text: string
    serviceIncluded?: Array<string>
  }

export interface MyTripItinerary {
    date: number
    items: Array<MyTripFlightData | MyTripCharterData | MyTripTransferData | MyTripLodgeActivitiesData>
  }

export interface MyTrip {
    bookingId: string
    reservationHolder: string
    program: MyTripProgram
    manage: Array<MyTripManageAction>
    payment: MyTripPayment
    itinerary: Array<MyTripItinerary>
  }
