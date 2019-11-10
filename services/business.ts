import dataAccessService, { DataAccessService } from './database'


interface Services {
  getDestinations(): Promise<Array<Destination>>
}

class BusinessService implements Services {
  da: DataAccessService = dataAccessService

  getDestinations(): Promise<Array<Destination>> {
    return this.da.getDestinations()
  }
}

export default new BusinessService()

// export const businessService = new BusinessService()
