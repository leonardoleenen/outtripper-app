declare module '*.json' {
  const value: any
  export default value
}


type Organization = {
  id: string
  cn: string
  type: 'AGENCY' | 'LODGE'
}

type TokenOuttripper = {
  id: string
  userCn: string
  organizationId?: string
  organizationCn?: string
  organizationKind? : string
  rol?: string
  photoAvatar?: string
  collectionKind?: string
}

type User = {
  _id?: string,
  uid: string
  cn: string
  email: string
  photoAvatar: string
  rol : 'AGENCY' | 'LODGE' | 'CONSUMER'
  accessToken: string
  organization: Organization
  collectionKind? : string
}

type LoggedUser = {
  token : TokenOuttripper
  photoURL : string
}

type Destination = {
  _id?: string,
  id: string,
  cn: string,
}


type Program = {
  id: string
  bedNights: number
  kind: string
  minimunForBooking: number
  monthAvailable: Array<string>
  name: string
  reserveSpotForEachBooking: number
  startingDay: Array<string>
  serviceDaysQuantity: number
}


type AvailableDate = {
  id : string
  from : number
  to: number
  programId: string
  freeSpots: number
  totalSpots: number
  days?: Array<any>
  price: number
}

type Contact = {
  id?: string
  firstName: string
  lastName: string
  email: string
  owner?: Organization
  collectionKind?:string
  rawText?: string
}

type SystemNotification = {
  _id: string
  id: string
  eventDate : number
  message: string
  to: User | Organization,
  hasReaded: boolean
  collectionKind? : string
}

type Invitation = {
  invitationSendBy: string
  invitationTo: string
  status: string
  memberOf: string
  organizationName: string
  rol: string
  bindToUserId?: string
}

type MonthAndYear = {
  month: number
  year: number
}

type ReservationNote = {
  id: string
  note: string
  date: number
}

type Reservation = {
  id : string
  reservationHolder: Contact
  daysInHold: number
  reservationLabel: string
  invoices: Array<string>
  reservedAt: number
  reservedBy: string
  serviceFrom: number
  serviceTo: number
  pax: Array<Contact>
  status: number
  program? : Program
  invoicesObject? : Array<Invoice>
  isOnHold?: boolean
  amountOfPayment? : number
  amountOfPurchase? : number
  termsAndConditionsLiteral: string
  rawText? : string
  notes? : Array<ReservationNote>
  financialState?: string
}

type ItemInvoice = {
  id: string
  description: string
  kind: string
  price : number
}

type Installment = {
  dueDate: number,
  amount: number
  order: number
}

type Invoice = {
  id: string
  items : Array<ItemInvoice>
  installments: Array<Installment>
}

type Payment = {
  id: string
  invoiceId: string
  date: number
  kind: string
  amount: number,
  paymentDate: number,
  reference: string
}

type CreditCard = {
  brand: string
  cardHolder: string
  cardNumber: string
  dueDate: string
  cvc: number
}

type WireTransfer = {
  bank: string
  reference : string
}
