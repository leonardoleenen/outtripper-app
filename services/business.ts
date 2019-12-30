import uuidv4 from 'uuid4'
import axios from 'axios'
import getConfig from 'next/config'
import dataAccessService, { DataAccessService } from './database'

const { publicRuntimeConfig: { API_SERVER } } = getConfig()

interface Services {
  getDestinations(): Promise<Array<Destination>>
  getPrograms(destination: Destination) : Promise<Array<Program>>


  getAllAvailableDate(destination: Destination): Promise<Array<AvailableDate>>
  getAvailableDate(id: string, destinationId: string) : Promise<AvailableDate>

  getContacts() : Promise<Array<Contact>>
  generateUniversalId(user: User): string
  saveContact(contact: Contact, user: User) : void
  getNotifications() : Promise<Array<SystemNotification>>
  getInvitation(id: string): Promise<Invitation>
  login(uid:string, cn:string, email:string, photoAvatar?:string) : Promise<TokenOuttripper>
  getToken() : Promise<TokenOuttripper>
}


class BusinessService implements Services {
  saveContact(contact: Contact, user: User): void {
    const contactToSave = contact
    contactToSave.owner = user.organization
    contactToSave.collectionKind = 'contact'
    contactToSave.id = this.generateUniversalId(user)
    this.da.saveContact(contactToSave)
  }


  outtripperServer = axios

  da: DataAccessService = dataAccessService

  // tokenToB64 = (token: any) : string => `Basic ${btoa(JSON.stringify(token))}`

  login(uid: string, cn: string, email: string, photoAvatar?: string): Promise<TokenOuttripper> {
    return this.outtripperServer.post('https://us-central1-norse-carport-258615.cloudfunctions.net/login', {
      uid, cn, email,
    }).then((result) => {
      // eslint-disable-next-line no-param-reassign
      result.data.photoAvatar = photoAvatar
      this.da.setToken(result.data)

      this.outtripperServer.defaults.headers.common.Authorization = `Basic ${btoa(JSON.stringify(result.data))}`
      return result.data as TokenOuttripper
    })
  }

  getToken(): Promise<TokenOuttripper> {
    return this.da.getToken()
  }

  getInvitation(id: string): Promise<Invitation> {
    return this.da.getInvitation(id)
  }

  getNotifications(): Promise<SystemNotification[]> {
    return this.da.getNotifications()
  }

  // eslint-disable-next-line class-methods-use-this
  generateUniversalId(_user: User): string {
    return uuidv4().toString()
  }

  getContacts(): Promise<Contact[]> {
    // console.log(this.outtripperServer.defaults.headers)
    // eslint-disable-next-line max-len
    return this.getToken().then((token) => this.outtripperServer.get(`${API_SERVER}getContactsCalendar`, { headers: { Authorization: `Basic ${btoa(JSON.stringify(token))}` } })
      .then((result) => result.data))

    // this.outtripperServer.get(`${API_SERVER}getContactsCalendar`, { headers: { Authorization: `Basic ${btoa(JSON.stringify(token))}` } }).then((result) => result.data as Array<Contact>)
  }

  getAllAvailableDate(destination: Destination): Promise<AvailableDate[]> {
    return this.da.getAllAvailableDate(destination)
  }

  getAvailableDate(id: string, destinationId: string): Promise<AvailableDate> {
    return this.da.getAvailableDate(id, destinationId)
  }

  getPrograms(destination: Destination): Promise<Program[]> {
    return this.da.getPrograms(destination)
  }

  getDestinations(): Promise<Array<Destination>> {
    return this.da.getDestinations()
  }
}

export default new BusinessService()

// export const businessService = new BusinessService()
