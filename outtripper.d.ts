type Organization = {
  id: string
  cn: string
  type: 'AGENCY' | 'LODGE'
}

type User = {
  _id?: string,
  uid: string
  cn: string
  email: string
  rol : 'AGENCY' | 'LODGE' | 'CONSUMER'
  accessToken: string
  organization: Organization
}

type Destination = {
  _id?: string,
  id: string,
  cn: string,
}

type Program = {
  _id?: string,
 destination: Destination,
 id: string,
 cn: string,
}

type AvailableDate = {
  _id?: string,
  id: string,
  program: Program,
  dateFrom: number,
  dateTo: number,
  freeSpots: number,
  totalSpots: number,
  price: number
}

type Contact = {
  id?: string
  firstName: string
  lastName: string
  email: string
  owner?: Organization
}
