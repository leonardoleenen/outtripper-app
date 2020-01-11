/* eslint-disable no-return-assign */

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
  createInvoice(organizationId: string, invoiceId: string, items: Array<ItemInvoice>, installments: Array<Installment>) : void
  reservationSetStatus(organizationId: string, reservationId: string, status: number) : Promise<void>
  setPax(organizationId: string, reservationid: string, pax: Contact, index: number) : Promise<Reservation>
  updateAvailableDate(organizationid: string, date: AvailableDate) : void
  deleteAvailableDate(organizationId: string, date: AvailableDate): void
  getPaymentsByInvoiceId(organizationId: string, invoiceId: string) : Promise<Array<Payment>>
  createPayment(organizationId: string, payment: Payment) : void
  getMyReservations(organizationId: string) : Promise<Array<Reservation>>
  updateInvoice(organizationId: string, invoice: Invoice) : void
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
          // if (doc.data().to < new Date(year, month + 1, 1)) { availability.push(doc.data() as AvailableDate) }
          availability.push(doc.data() as AvailableDate)
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

  async getReservation(organizationId: string, id: string): Promise<Reservation> {
    const reservation = await this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('reservations')
      .doc(id)
      .get()
      .then((doc) => doc.data() as Reservation)

    const invoices = await this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('invoices')
      .where('id', 'in', (await reservation).invoices)
      .get()
      .then((snap) => snap.docs.map((doc) => doc.data())) as Array<Invoice>

    const payments = await this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('payments')
      .where('invoiceId', 'in', (await reservation).invoices)
      .get()
      .then((snap) => snap.docs.map((doc) => doc.data())) as Array<Payment>


    reservation.invoicesObject = invoices
    // eslint-disable-next-line no-param-reassign
    reservation.amountOfPurchase = invoices.map((invoice: Invoice) => invoice.items).reduce((total, v) => v).map((item: ItemInvoice) => item.price).reduce((total, v) => total += v)
    reservation.isOnHold = payments.length === 0 || false
    // eslint-disable-next-line no-param-reassign
    reservation.amountOfPayment = payments.length > 0 ? payments.map((p: Payment) => p.amount).reduce((total, v) => total += v) : 0
    return reservation
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

  createInvoice(organizationId: string, invoiceId: string, items: Array<ItemInvoice>, installments: Array<Installment>): void {
    this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('invoices')
      .doc(invoiceId)
      .set({
        id: invoiceId,
        items,
        installments,
      })
  }

  reservationSetStatus(organizationId: string, reservationId: string, status: number): Promise<void> {
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('reservations')
      .doc(reservationId)
      .update({ status })
  }

  setPax(organizationId: string, reservationId: string, pax: Contact, index: number): Promise<Reservation> {
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('reservations')
      .doc(reservationId)
      .get()
      .then((doc) => {
        const paxs : Array<Contact> = (doc.data() as Reservation).pax
        const reservationFetched : Reservation = doc.data() as Reservation
        paxs[index] = pax
        reservationFetched.pax = paxs

        this.fb
          .firestore()
          .collection(organizationId)
          .doc('dates')
          .collection('reservations')
          .doc(reservationId)
          .update({ pax: paxs })


        return reservationFetched
      })
  }

  updateAvailableDate(organizationId: string, date: AvailableDate): void {
    this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('availability')
      .doc(date.id)
      .set(date)
  }

  deleteAvailableDate(organizationId: string, date: AvailableDate): void {
    this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('availability')
      .doc(date.id)
      .delete()
  }

  getPaymentsByInvoiceId(organizationId: string, invoiceId: string): Promise<Payment[]> {
    const payments : Array<Payment> = []
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('payments')
      .where('invoiceId', '==', invoiceId)
      .get()
      .then((snap) => {
        snap.docs.forEach((doc) => {
          payments.push(doc.data() as Payment)
        })
        return payments
      })
  }


  getDestinations(): Promise<Array<Destination>> {
    return this.db.find({
      selector: {
        collectionKind: 'destinationCatalogItem',
      },
    }).then((result) => result.docs)
  }

  createPayment(organizationId: string, payment: Payment): void {
    this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('payments')
      .doc(payment.id)
      .set(payment)
  }

  async getMyReservations(organizationId: string): Promise<Reservation[]> {
    const queryResult : Array<Reservation> = await this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('reservations')
      .where('serviceFrom', '>', new Date().getTime())
      .get()
      .then(async (snap) => snap.docs.map((doc) => doc.data() as Reservation))

    queryResult.map(async (r:Reservation) => this.getReservation(organizationId, r.id))

    return Promise.all(queryResult.map(async (r:Reservation) => this.getReservation(organizationId, r.id)))
  }

  updateInvoice(organizationId: string, invoice: Invoice): void {
    this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('invoices')
      .doc(invoice.id)
      .update(invoice)
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
