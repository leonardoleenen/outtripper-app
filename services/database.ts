
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'


declare interface DataService {
  getDestinations(): Promise<Array<Destination>>
  getPrograms(destination: Destination): Promise<Array<Program>>
  getAllAvailableDate(destination: Destination): Promise<Array<AvailableDate>>
  getContacts(organization: Organization) : Promise<Array<Contact>>
}

export class DataAccessService implements DataService {
  db: any

  remote: any

  getContacts(organization: Organization): Promise<Contact[]> {
    return this.db.find({
      selector: {
        collectionKind: 'contact',
      },
    }).then((result) => result.docs.filter((c:Contact) => c.owner.id === organization.id))
  }

  getAllAvailableDate(destination: Destination): Promise<AvailableDate[]> {
    return this.db.find({
      selector: {
        collectionKind: 'availableDate',
      },
    }).then((result) => result.docs.filter((p:AvailableDate) => p.program.destination.id === destination.id))
  }

  getPrograms(destination: Destination): Promise<Program[]> {
    return this.db.find({
      selector: {
        collectionKind: 'program',
      },
    }).then((result) => result.docs.filter((p:Program) => p.destination.id === destination.id))
  }

  getDestinations(): Promise<Array<Destination>> {
    return this.db.find({
      selector: {
        collectionKind: 'destinationCatalogItem',
      },
    }).then((result) => result.docs)
  }

  constructor() {
    PouchDB.plugin(PouchDBFind)
    this.db = new PouchDB('outtripper')
    this.remote = new PouchDB('http://localhost:5984/outtripper')
    this.db.sync(this.remote, {
      live: true,
    })
  }
}

export default new DataAccessService()
