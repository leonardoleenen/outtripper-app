
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
  getPrograms(organizationId: string): Promise<Array<Program>>
  setToken(token : TokenOuttripper) : void
  getToken() : Promise<TokenOuttripper>
  getContacts(organizationId: string) : Promise<Array<Contact>>
  saveContact(contact: Contact) : void
  getNotifications() : Promise<Array<SystemNotification>>
  addNotification(notification : SystemNotification) : void
  saveNotification(notification: SystemNotification): void
  getAvailableDates(organizationId: string, programId: string, month: number, year: number)
  getAvailability(organizationId: string) : Promise<Array<AvailableDate>>
  getInvitation(id: string): Promise<Invitation>
  getReservation(organizationId: string, id: string) : Promise<Reservation>
  getInvoice(organizationId: string, id: string) :Promise<Invoice>
  createReservation(organizationId: string, reservation: Reservation) : void
  createInvoice(organizationId: string, invoiceId: string, items: Array<ItemInvoice>) : void
  reservationSetStatus(organizationId: string, reservationId: string, status: number) : Promise<void>
 }

export class DataAccessService implements DataService {
  getAvailability(organizationId: string): Promise<AvailableDate[]> {
    const dates : Array<AvailableDate> = []
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('availability')
      .get()
      .then((snap) => {
        snap.docs.forEach((doc) => {
          dates.push(doc.data() as AvailableDate)
        })

        return dates
      })
  }

  db: any

  fb = firebase

  remote: any

  setToken(token: TokenOuttripper): void {
    this.db.post({
      ...token,
      collectionKind: 'token',
    })
  }

  getToken(): Promise<TokenOuttripper> {
    return this.db.find({
      selector: {
        collectionKind: 'token',

      },
    }).then((result) => result.docs[0])
  }

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


  getPrograms(organizationId: string): Promise<Program[]> {
    const programs : Array<Program> = []

    return this.fb.firestore()
      .collection(organizationId)
      .doc('settings')
      .collection('programs')
      .get()
      .then((snap) => {
        // eslint-disable-next-line array-callback-return
        snap.docs.map((doc) => {
          programs.push(doc.data() as Program)
        })
        return programs
      })
  }

  getAvailableDates(organizationId: string, programId: string, month: number, year: number) {
    const availability : Array<AvailableDate> = []
    return this.fb.firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('availability')
      .where('from', '>=', new Date(year, month, 0).getTime())
      .where('programId', '==', programId)
      .get()
      .then((snap) => {
        snap.docs.forEach((doc) => {
          if (doc.data().to < new Date(year, month + 1, 1)) { availability.push(doc.data() as AvailableDate) }
        })
        return availability
      })
  }

  getContacts(organizationId: string): Promise<Array<Contact>> {
    const contacts : Array<Contact> = []
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('people')
      .collection('contact')
      .get()
      .then((snap) => {
        snap.docs.forEach((doc) => {
          contacts.push(doc.data() as Contact)
        })
        return contacts
      })
  }

  getReservation(organizationId: string, id: string): Promise<Reservation> {
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('reservations')
      .doc(id)
      .get()
      .then((doc) => doc.data() as Reservation)
  }

  getInvoice(organizationId: string, id: string): Promise<Invoice> {
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('invoices')
      .doc(id)
      .get()
      .then((doc) => doc.data() as Invoice)
  }

  createReservation(organizationId: string, reservation: Reservation): void {
    this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('reservations')
      .doc(reservation.id)
      .set(reservation)
  }

  createInvoice(organizationId: string, invoiceId: string, items: Array<ItemInvoice>): void {
    this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('invoices')
      .doc(invoiceId)
      .set({
        id: invoiceId,
        items,
      })
  }

  reservationSetStatus(organizationId: string, reservationId: string, status: number): Promise<void> {
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('reservations')
      .doc(reservationId)
      .set({ status })
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
