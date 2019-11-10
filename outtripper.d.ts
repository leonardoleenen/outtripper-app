
type User = {
  uid: string
  cn: string
  email: string
  rol : 'AGENCY' | 'LODGE' | 'CONSUMER'
  accessToken: string
}

type Destination = {
  id: string,
  cn: string,
}