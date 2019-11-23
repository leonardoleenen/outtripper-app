import uuidv4 from 'uuid4'
import dataAccessService, { DataAccessService } from './database'

interface Services {
  getDestinations(): Promise<Array<Destination>>
  getPrograms(destination: Destination) : Promise<Array<Program>>
  getAllAvailableDate(destination: Destination): Promise<Array<AvailableDate>>
  getContacts(organization: Organization) : Promise<Array<Contact>>
  generateUniversalId(user: User): string
  saveContact(contact: Contact, user: User) : void
  getNotifications(user: User) : Promise<Array<SystemNotificaction>>
}


class BusinessService implements Services {
  saveContact(contact: Contact, user: User): void {
    const contactToSave = contact
    contactToSave.owner = user.organization
    contactToSave.collectionKind = 'contact'
    contactToSave.id = this.generateUniversalId(user)
    this.da.saveContact(contactToSave)
  }

  da: DataAccessService = dataAccessService

  getNotifications(user: User): Promise<SystemNotificaction[]> {
    return this.da.getNotifications(user)
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
