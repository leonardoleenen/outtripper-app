import dataAccessService, { DataAccessService } from './database'


interface Services {
  getDestinations(): Promise<Array<Destination>>
  getPrograms(destination: Destination) : Promise<Array<Program>>
  getAllAvailableDate(destination: Destination): Promise<Array<AvailableDate>>
  getContacts(organization: Organization) : Promise<Array<Contact>>
}

class BusinessService implements Services {
  da: DataAccessService = dataAccessService

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
