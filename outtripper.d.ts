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
  _id?: string,
 destination: Destination,
 id: string,
 cn: string,
 collectionKind?:string
}

type AvailableDate = {
  _id?: string,
  id: string,
  program: Program,
  from: number,
  to: number,
  freeSpots: number,
  totalSpots: number,
  regularPrice: number
  collectionKind?:string
}

type Contact = {
  id?: string
  firstName: string
  lastName: string
  email: string
  owner?: Organization
  collectionKind?:string
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
