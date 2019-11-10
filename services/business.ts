import dataAccessService, { DataAccessService } from './database'


interface Services {
  getDestinations(): Promise<Array<Destination>>
  getPrograms(destination: Destination) : Promise<Array<Program>>
  getAllAvailableDate(destination: Destination): Promise<Array<AvailableDate>>
}

class BusinessService implements Services {
  da: DataAccessService = dataAccessService

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
