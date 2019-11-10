
type User = {
  _id?: string,
  uid: string
  cn: string
  email: string
  rol : 'AGENCY' | 'LODGE' | 'CONSUMER'
  accessToken: string
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
  date: Date,
  freeSpots: number,
  totalSpots: number
}
