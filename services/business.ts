import uuidv4 from 'uuid4'
import axios from 'axios'
import dataAccessService, { DataAccessService } from './database'

interface Services {
  getDestinations(): Promise<Array<Destination>>
  getPrograms(destination: Destination) : Promise<Array<Program>>


  getAllAvailableDate(destination: Destination): Promise<Array<AvailableDate>>


  getContacts(organization: Organization) : Promise<Array<Contact>>
  generateUniversalId(user: User): string
  saveContact(contact: Contact, user: User) : void
  getNotifications() : Promise<Array<SystemNotification>>
  getInvitation(id: string): Promise<Invitation>
  login(uid:string, cn:string, email:string) : Promise<TokenOuttripper>
  getLoggedUser() : LoggedUser

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

  login(uid: string, cn: string, email: string): Promise<TokenOuttripper> {
    return this.outtripperServer.post('https://us-central1-norse-carport-258615.cloudfunctions.net/login', {
      uid, cn, email,
    }).then((result) => result.data as TokenOuttripper)
  }

  // eslint-disable-next-line class-methods-use-this
  getLoggedUser() : LoggedUser {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) as LoggedUser : null
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

  getContacts(organization: Organization): Promise<Contact[]> {
    return this.da.getContacts(organization)
  }

  getAllAvailableDate(destination: Destination): Promise<AvailableDate[]> {
    return this.da.getAllAvailableDate(destination)
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
