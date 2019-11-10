import { dataAccessService, DataAccessService } from './database'


interface Services {
  getDestinations(): Promise<Destination>
}

class BusinessService implements Services {

  da: DataAccessService = dataAccessService

  getDestinations(): Promise<Destination> {
    return this.da.getDestinations()
  }
}

export const businessService = new BusinessService()