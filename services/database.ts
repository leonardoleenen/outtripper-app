
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'


declare interface DataService {
  getDestinations(): Promise<Array<Destination>>
}

export declare class DataAccessService implements DataService {
  db: any

  remote: any

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
