
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import firebase from 'firebase'
import { firebaseKey } from '../keys'


// eslint-disable-next-line import/no-unresolved
// const serviceAccount = require('../keys/firebase.json')

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseKey)
}


declare interface DataService {
  getDestinations(): Promise<Array<Destination>>
  getPrograms(destination: Destination): Promise<Array<Program>>
  getAllAvailableDate(destination: Destination): Promise<Array<AvailableDate>>
  addAvailableDate(date: AvailableDate) : void
  getContacts(organization: Organization) : Promise<Array<Contact>>
  saveContact(contact: Contact) : void
  getNotifications() : Promise<Array<SystemNotification>>
  addNotification(notification : SystemNotification) : void
  saveNotification(notification: SystemNotification): void

  getInvitation(id: string): Promise<Invitation>

}

export class DataAccessService implements DataService {
  db: any

  fb = firebase

  remote: any

  getInvitation(id: string): Promise<Invitation> {
    return this.fb.firestore()
      .collection('invitations')
      .doc(id)
      .get()
      .then((doc) => doc.data() as Invitation)
  }

  addNotification(notification: SystemNotification): void {
    this.db.find({
      selector: {
        collectionKind: 'notification',
        id: notification.id,
      },
    }).then((result) => {
      if (result.docs.length === 0) { this.db.post(notification) }
    })
  }

  saveNotification(notification: SystemNotification): void {
    this.db.find({
      selector: {
        collectionKind: 'notification',
        id: notification.id,
      },
    }).then((result) => {
      this.db.put({
        ...result.docs[0],
        ...notification,
      })
    })
  }

  notificationListener = () : void => {
    this.fb.firestore()
      .collection('JURASSICLAKE')
      .doc('notifications')
      .collection('userid1')
      .onSnapshot((snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === 'added') {
            // console.log('Added: ', change.doc.data())
            this.addNotification(change.doc.data() as SystemNotification)
          }
          if (change.type === 'modified') {
            this.saveNotification(change.doc.data() as SystemNotification)
            //  console.log('Modified : ', change.doc.data())
          }
          if (change.type === 'removed') {
            console.log('Removed : ', change.doc.data())
          }
        })
      })
  }


  getNotifications(): Promise<SystemNotification[]> {
    return this.db.find({
      selector: {
        collectionKind: 'notification',
      },
    }).then((result) => result.docs)
  }

  saveContact(contact: Contact): void {
    this.db.post(contact)
  }

  getContacts(organization: Organization): Promise<Contact[]> {
    return this.db.find({
      selector: {
        collectionKind: 'contact',
      },
    }).then((result) => result.docs.filter((c:Contact) => c.owner.id === organization.id))
  }

  getAllAvailableDate(destination: Destination): Promise<AvailableDate[]> {
    return this.fb.firestore()
      .collection(destination.id)
      .doc('dates')
      .collection('availability')
      .get()
      .then((snap) => snap.docs.map((doc) => doc.data() as AvailableDate))
  }


  addAvailableDate(date: AvailableDate): void {
    this.db.find({
      selector: {
        collectionKind: 'availableDates',
        id: date.id,
      },
    }).then((result) => {
      if (result.docs.length === 0) { this.db.post(date) }
    })
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
    // this.remote = new PouchDB('http://35.221.43.54:5984/outtripper')
    // this.db.sync(this.remote, {
    //   live: true,
    // })
  }
}


const listeners = new DataAccessService()
listeners.notificationListener()

export default new DataAccessService()
