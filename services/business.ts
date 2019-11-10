import dataAccessService, { DataAccessService } from './database'


interface Services {
  getDestinations(): Promise<Array<Destination>>
  getPrograms(destination: Destination) : Promise<Array<Program>>
}

class BusinessService implements Services {
  da: DataAccessService = dataAccessService

  getPrograms(destination: Destination): Promise<Program[]> {
    return this.da.getPrograms(destination)
  }

  getDestinations(): Promise<Array<Destination>> {
    return this.da.getDestinations()
  }
}

export default new BusinessService()

// export const businessService = new BusinessService()
