
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'


interface DataService {
  getDestinations(): Promise<Destination>
}
export class DataAccessService implements DataService {

  db: any
  remote: any

  getDestinations(): Promise<Destination> {
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

export const dataAccessService = new DataAccessService()