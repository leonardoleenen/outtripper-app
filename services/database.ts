/* eslint-disable no-return-assign */

// import RxDB from 'rxdb'
// import idb from 'pouchdb-adapter-idb'
import firebase from 'firebase'
import uuid4 from 'uuid4'
// import { firebaseKey } from '../keys'
// import getConfig from 'next/config'

// const { publicRuntimeConfig: { FIREBASE_KEY } } = getConfig()

// eslint-disable-next-line import/no-unresolved

// console.log(Buffer.from(FIREBASE_KEY, 'base64').toString())
if (!firebase.apps.length) {
  firebase.initializeApp(JSON.parse(Buffer.from('eyJhcGlLZXkiOiJBSXphU3lCb2R6NWRNeWozYTJpUlRsOEc0MThJaEFrTTlHWkJyVkkiLCJhdXRoRG9tYWluIjoibm9yc2UtY2FycG9ydC0yNTg2MTUuZmlyZWJhc2VhcHAuY29tIiwiZGF0YWJhc2VVUkwiOiJodHRwczovL25vcnNlLWNhcnBvcnQtMjU4NjE1LmZpcmViYXNlaW8uY29tIiwicHJvamVjdElkIjoibm9yc2UtY2FycG9ydC0yNTg2MTUiLCJzdG9yYWdlQnVja2V0Ijoibm9yc2UtY2FycG9ydC0yNTg2MTUuYXBwc3BvdC5jb20iLCJtZXNzYWdpbmdTZW5kZXJJZCI6IjM5ODk3MTkzMTI4MSIsImFwcElkIjoiMTozOTg5NzE5MzEyODE6d2ViOjI3MmRiOWI3MmVkNmEyYWU0ZThkMzAiLCJtZWFzdXJlbWVudElkIjoiRy1CTTczUlQ5UTBEIn0', 'base64').toString()))
}


declare interface DataService {
  getDestinations(): Promise<Array<Destination>>
  getPrograms(organizationId: string): Promise<Array<Program>>
  getProgram(organizationId: string, programId: string) : Promise<Program>
  setToken(token : TokenOuttripper) : Promise<TokenOuttripper>
  getToken() : Promise<TokenOuttripper>
  getContact(organizationId: string, id: string) : Promise<Contact>
  getContacts(organizationId: string) : Promise<Array<Contact>>
  saveContact(organizationId: string, contact: Contact) : Promise<Contact>
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
  createInvitation(invite: Invitation) : Promise<Invitation>
  getInvitations(organizationId: string) : Promise<Array<Invitation>>
  updateInvitation(invitation: Invitation) : Promise<Invitation>
  getRoles(): Promise<Array<Role>>
  createUser(user: User) : Promise<User>
  addDealAccess(user: User, organizationId: string, role: Role) : void
  getReservationAccessToken(id: string) : Promise<ReservationToken>
  getReservationAccessTokenByReservationId(id: string) : Promise<ReservationToken>
  createReservationAccessToken(reservationToken: ReservationToken) : Promise<ReservationToken>
  getOrganization(organizationId: string) : Promise<Organization>

  updateReservation(organizationId : string, reservation: Reservation) : Promise<Reservation>

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

  // eslint-disable-next-line class-methods-use-this
  setToken(token: TokenOuttripper): Promise<TokenOuttripper> {
    if (sessionStorage) {
      sessionStorage.setItem('token', btoa(JSON.stringify(token)))
      return new Promise((res) => res(token))
    }
    return null
  }

  // eslint-disable-next-line class-methods-use-this
  getToken(): Promise<TokenOuttripper> {
    return sessionStorage ? new Promise((res) => res(JSON.parse(atob(sessionStorage.getItem('token'))) as TokenOuttripper)) : null
  }

  getInvitation(id: string): Promise<Invitation> {
    return this.fb.firestore()
      .collection('invitations')
      .doc(id)
      .get()
      .then((doc) => doc.data() as Invitation)
  }


  // eslint-disable-next-line class-methods-use-this
  addNotification(_notification: SystemNotification): void {
    return null
  }

  // eslint-disable-next-line class-methods-use-this
  saveNotification(_notification: SystemNotification): void {
    return null
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


  // eslint-disable-next-line class-methods-use-this
  getNotifications(): Promise<SystemNotification[]> {
    return null
  }


  saveContact(organizationId: string, contact: Contact): Promise<Contact> {
    const newContact : Contact = {
      ...contact,
      id: contact.id || uuid4(),
    }
    return this.fb.firestore()
      .collection(organizationId)
      .doc('people')
      .collection('contact')
      .doc()
      .set(newContact)
      .then(() => newContact)
  }


  getProgram(organizationId: string, programId: string): Promise<Program> {
    return this.fb.firestore()
      .collection(organizationId)
      .doc('settings')
      .collection('programs')
      .doc(programId)
      .get()
      .then((doc) => doc.data() as Program)
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
      .where('from', '>=', new Date(year, month, 0).getTime() > new Date().getTime() ? new Date(year, month, 0).getTime() : new Date().getTime())
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

    const programId : string = invoices[0].items.filter((i: ItemInvoice) => i.kind === 'PROGRAM')[0].id
    reservation.program = await this.getProgram(organizationId, programId)
    reservation.invoicesObject = invoices
    // eslint-disable-next-line no-param-reassign
    reservation.amountOfPurchase = invoices.map((invoice: Invoice) => invoice.items).reduce((total, v) => v).map((item: ItemInvoice) => item.price).reduce((total, v) => total += v)
    reservation.isOnHold = payments.length === 0 || false
    reservation.payments = payments
    // eslint-disable-next-line no-param-reassign
    reservation.amountOfPayment = payments.length > 0 ? payments.map((p: Payment) => p.amount).reduce((total, v) => total += v) : 0
    reservation.reservationAccessToken = await this.getReservationAccessTokenByReservationId(reservation.id)
    if ((reservation.amountOfPurchase - reservation.amountOfPayment) === 0) {
      reservation.financialState = 'PAID'
    }

    if ((reservation.amountOfPurchase - reservation.amountOfPayment) > 0) {
      reservation.financialState = 'PARTIALLY PAID'
    }

    if (reservation.amountOfPayment === 0) {
      reservation.financialState = 'NO PAYMENTS'
    }


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

        return this.fb
          .firestore()
          .collection(organizationId)
          .doc('dates')
          .collection('reservations')
          .doc(reservationId)
          .update({ pax: paxs })
          .then(() => this.getReservation(organizationId, reservationId))
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


  // eslint-disable-next-line class-methods-use-this
  getDestinations(): Promise<Array<Destination>> {
    return null
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

  getContact(organizationId: string, id: string): Promise<Contact> {
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('people')
      .collection('contact')
      .doc(id)
      .get()
      .then((doc) => doc.data() as Contact)
  }

  createInvitation(invite: Invitation): Promise<Invitation> {
    // eslint-disable-next-line no-param-reassign
    invite.id = uuid4()
    return this.fb
      .firestore()
      .collection('invitations')
      .doc(invite.id)
      .set(invite)
      .then((r) => invite)
  }

  getInvitations(organizationId: string): Promise<Invitation[]> {
    return this.fb
      .firestore()
      .collection('invitations')
      .where('organizationId', '==', organizationId)
      .get()
      .then((snap) => snap.docs.map((doc) => doc.data() as Invitation))
  }

  getRoles(): Promise<Role[]> {
    return this.fb
      .firestore()
      .collection('roles')
      .get()
      .then((snap) => snap.docs.map((doc) => doc.data() as Role))
  }

  createUser(user: User) {
    return this.fb
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => user)
  }

  addDealAccess(user: User, organizationId: string, role: Role): void {
    this.fb
      .firestore()
      .collection('dealAccess')
      .doc(user.uid)
      .set({
        organization: organizationId,
        rol: role.id,
      })
  }

  updateInvitation(invitation: Invitation): Promise<Invitation> {
    return this.fb
      .firestore()
      .collection('invitations')
      .doc(invitation.id)
      .update(invitation)
      .then(() => invitation)
  }

  createReservationAccessToken(reservationToken: ReservationToken): Promise<ReservationToken> {
    return this.fb
      .firestore()
      .collection('reservationsAccessTokens')
      .doc(reservationToken.id)
      .set(reservationToken)
      .then(() => reservationToken)
  }


  getReservationAccessToken(id: string): Promise<ReservationToken> {
    return this.fb
      .firestore()
      .collection('reservationsAccessTokens')
      .doc(id)
      .get()
      .then((doc) => doc.data() as ReservationToken)
  }

  getOrganization(organizationId: string): Promise<Organization> {
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('info')
      .get()
      .then((doc) => doc.data() as Organization)
  }

  getReservationAccessTokenByReservationId(id: string): Promise<ReservationToken> {
    return this.fb
      .firestore()
      .collection('reservationsAccessTokens')
      .where('reservationId', '==', id)
      .get()
      .then((snap) => snap.docs.map((doc) => doc.data() as ReservationToken)[0])
  }

  updateReservation(organizationId: string, reservation: Reservation): Promise<Reservation> {
    return this.fb
      .firestore()
      .collection(organizationId)
      .doc('dates')
      .collection('reservations')
      .doc(reservation.id)
      .update(reservation)
      .then(() => reservation)
  }
}


const listeners = new DataAccessService()
listeners.notificationListener()

const dbConnector : DataAccessService = new DataAccessService()


export default dbConnector
