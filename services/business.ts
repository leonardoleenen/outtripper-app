/* eslint-disable no-param-reassign */
import uuidv4 from 'uuid4'
import axios from 'axios'
import moment from 'moment'
import voucherVodes from 'voucher-code-generator'
import dataAccessService, { DataAccessService } from './database'


export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})


export enum ITINERARY_EVENT {
  CHARTERFLIGHT = 'CHARTERFLIGHT',
  GROUNDTRANSFER ='GROUNDTRANSFER',
  COMERCIALFLIGHT = 'COMERCIALFLIGHT',
  RESTAURANT = 'RESTAURANT',
  GENERAL_ACTIVITIE ='GENERAL_ACTIVITIE',
  LODGE_ACTIVITIE = 'LODGE_ACTIVITIE',
  RENTAL_CAR = 'RENTAL_CAR',
  ATTRACTION= 'ATTRACTION',
  HOTEL = 'HOTEL'
}

interface Services {
  getDestinations(): Promise<Array<Destination>>
  getPrograms() : Promise<Array<Program>>
  getAvailability(year: number) : Promise<Array<AvailableDate>>
  getAvailabilityByMonthAndYear(programId:string, month: number, year: number) : Promise<Array<AvailableDate>>
  getContacts() : Promise<Array<Contact>>
  generateUniversalId(user: User): string
  saveContact(contact: Contact) : Promise<Contact>
  getNotifications() : Promise<Array<SystemNotification>>
  getInvitation(id: string): Promise<Invitation>
  login(uid:string, cn:string, email:string, photoAvatar?:string) : Promise<TokenOuttripper>
  getToken() : Promise<TokenOuttripper>
  getReservation(reservationId: string) : Promise<Reservation>
  getInvoice(invoiceId: string) : Promise<Invoice>
  createReservation(reservationHolder: Contact, daysInHold:number, pax: Array<Contact>, reservationLabel: string, date: AvailableDate, installments: number) : Promise<Reservation>
  sendReservationToParticipants(reservation: Reservation) : Promise<Reservation>
  updateAvailableDate(date:AvailableDate, reservation: Reservation) : void
  getPaymentsByInvoiceId(invoiceId: string) : Promise<Array<Payment>>
  setAPayment(invoiceId: string, amount: number, kind: string, paymentDate: number, paymentReference: string) : Promise<Payment>
  getMyReservations() : Promise<Array<Reservation>>
  getNextInstallmentInDueDate(reservation: Reservation) : Installment
  getListPendingInstallments(reservation: Reservation) : Array<Installment>
  getDiffDaysForInstallmentNextDue(reservation :Reservation) : number
  createInvite(email: string, roles: Array<Role>) : Promise<Invitation>
  getInvitations(): Promise<Array<Invitation>>
  getRoles(): Promise<Array<Role>>
  createUser(user: User, invitation: Invitation) : Promise<TokenOuttripper>
  getReservationAccessToken(id: string) : Promise<ReservationToken>
  createConsumerToken(reservationAccessToken: ReservationToken) : Promise<TokenOuttripper>
  getOrganization() : Promise<Organization>
}


class BusinessService implements Services {
  outtripperServer = axios

  da: DataAccessService = dataAccessService

  // tokenToB64 = (token: any) : string => `Basic ${btoa(JSON.stringify(token))}`

  login(uid: string, cn: string, email: string, photoAvatar?: string): Promise<TokenOuttripper> {
    return this.outtripperServer.post('https://us-central1-norse-carport-258615.cloudfunctions.net/login', {
      uid, cn, email,
    }).then((result) => {
      // eslint-disable-next-line no-param-reassign
      result.data.photoAvatar = photoAvatar
      this.da.setToken(result.data)

      this.outtripperServer.defaults.headers.common.Authorization = `Basic ${btoa(JSON.stringify(result.data))}`
      return result.data as TokenOuttripper
    })
  }

  getToken(): Promise<TokenOuttripper> {
    return this.da.getToken()
  }

  getInvitation(id: string): Promise<Invitation> {
    return this.da.getInvitation(id)
  }

  getNotifications(): Promise<SystemNotification[]> {
    return this.da.getNotifications()
  }

  // eslint-disable-next-line class-methods-use-this
  generateUniversalId(_user: User): string {
    return uuidv4().toString()
  }

  getContacts(): Promise<Contact[]> {
    // console.log(this.outtripperServer.defaults.headers)
    // eslint-disable-next-line max-len
    return this.getToken().then((token : TokenOuttripper) => this.da.getContacts(token.organizationId)
      .then((result) => result))

    // this.outtripperServer.get(`${API_SERVER}getContactsCalendar`, { headers: { Authorization: `Basic ${btoa(JSON.stringify(token))}` } }).then((result) => result.data as Array<Contact>)
  }


  getPrograms(): Promise<Program[]> {
    return this.getToken().then((token : TokenOuttripper) => this.da.getPrograms(token.organizationId))
  }

  getDestinations(): Promise<Array<Destination>> {
    return this.da.getDestinations()
  }

  // eslint-disable-next-line class-methods-use-this
  mergeAvailability(emptyAvailability: any) : Promise<Array<AvailableDate>> {
    // eslint-disable-next-line no-return-assign
    // eslint-disable-next-line no-param-reassign
    const mergedResult = emptyAvailability

    return this.getToken().then((token: TokenOuttripper) => this.da.getAvailability(token.organizationId).then((result : Array<AvailableDate>) => {
      let month = 0
      let day = 0
      result.forEach((v) => {
        month = new Date(v.from).getMonth()
        for (let i = 0; i <= moment(v.to).diff(moment(v.from), 'days'); i += 1) {
          day = parseInt(moment(v.from).format('DD'), 10) + i
          mergedResult[month].days[day - 1] = {
            availability: [v],
          }
        }
      })
      // result.data
      return mergedResult
    }))
  }


  // eslint-disable-next-line class-methods-use-this
  getAvailability(year:number): Promise<Array<AvailableDate>> {
    // const empty = Array(31)
    const feb = moment([year]).isLeapYear() ? 29 : 28

    const emptyMonth = [{
      month: 1,
      year,
      days: Array<undefined>(31).fill(undefined),
    }, {
      month: 2,
      year,
      days: Array<undefined>(moment([year]).isLeapYear() ? 29 : 28).fill(undefined),
    },
    {
      month: 3,
      year,
      days: Array<undefined>(31).fill(undefined),
    },
    {
      month: 4,
      year,
      days: Array<undefined>(30).fill(undefined),
    },
    {
      month: 5,
      year,
      days: Array<undefined>(31).fill(undefined),
    }, {
      month: 6,
      year,
      days: Array<undefined>(30).fill(undefined),
    },
    {
      month: 7,
      year,
      days: Array<undefined>(30).fill(undefined),
    },
    {
      month: 8,
      year,
      days: Array<undefined>(31).fill(undefined),
    },
    {
      month: 9,
      year,
      days: Array<undefined>(30).fill(undefined),
    },
    {
      month: 10,
      year,
      days: Array<undefined>(31).fill(undefined),
    },
    {
      month: 11,
      year,
      days: Array<undefined>(30).fill(undefined),
    }, {
      month: 12,
      year,
      days: Array<undefined>(31).fill(undefined),
    },
    ]

    return this.mergeAvailability(emptyMonth)
  }

  getAvailabilityByMonthAndYear(programId: string, month: number, year: number): Promise<AvailableDate[]> {
    return this.getToken().then((token: TokenOuttripper) => this.da.getAvailableDates(token.organizationId, programId, month, year))
  }

  getReservation(reservationId: string): Promise<Reservation> {
    return this.getToken().then((token: TokenOuttripper) => this.da.getReservation(token.organizationId, reservationId))
  }

  getInvoice(invoiceId: string): Promise<Invoice> {
    return this.getToken().then((token: TokenOuttripper) => this.da.getInvoice(token.organizationId, invoiceId))
  }

  createReservation(reservationHolder: Contact, daysInHold: number, pax: Contact[], reservationLabel: string, date: AvailableDate, installments: number): Promise<Reservation> {
    let reservation : Reservation = null
    return this.getToken().then(async (token:TokenOuttripper) => {
      const reservationId: string = voucherVodes.generate({
        length: 8,
        count: 1,
      })[0]

      const invoiceId: string = voucherVodes.generate({
        length: 8,
        count: 1,
      })[0]

      const itemsArray : Array<ItemInvoice> = []
      const program : Program = (await this.getPrograms())
        .filter((p:Program) => p.id === date.programId)[0]

      itemsArray.push({
        id: date.programId,
        description: program.name,
        kind: 'PROGRAM',
        price: date.price * pax.length,
      } as ItemInvoice)

      const installmentsList: Array<Installment> = []
      const totalDays = moment(date.from).diff(moment(new Date().getTime()).add(daysInHold, 'days'), 'days')


      for (let i:number = 0; i < installments; i += 1) {
        installmentsList.push({
          order: i + 1,
          amount: (date.price * pax.length) / installments,
          // eslint-disable-next-line radix
          dueDate: parseInt(moment(new Date().getTime()).add(daysInHold + (totalDays / installments) * i, 'days').format('x')),
        } as Installment)
      }

      this.da.createInvoice(token.organizationId, invoiceId, itemsArray, installmentsList)


      reservation = {
        id: reservationId.toUpperCase(),
        daysInHold,
        reservationHolder,
        reservationLabel,
        pax,
        serviceFrom: date.from,
        serviceTo: date.to,
        invoices: [invoiceId],
        reservedAt: new Date().getTime(),
        status: 0,
        reservedBy: token.id,
        termsAndConditionsLiteral: this.buildTerminsAndConditions(installmentsList),
      }

      this.da.createReservation(token.organizationId, reservation)
      this.updateAvailableDate(date, reservation)

      const reservationToken : ReservationToken = {
        id: uuidv4(),
        reservationId: reservation.id,
        organizationId: token.organizationId,
        organizationCN: token.organizationCn,
      }
      this.da.createReservationAccessToken(reservationToken)
      reservation.reservationAccessToken = reservationToken
      return reservation
    })
  }

  sendReservationToParticipants(reservation: Reservation): Promise<Reservation> {
    return this.getToken().then((token: TokenOuttripper) => {
      this.da.reservationSetStatus(token.organizationId, reservation.id, 1)
      // eslint-disable-next-line no-param-reassign
      reservation.status = 1
      return reservation
    })
  }

  setPax(reservation: Reservation, pax: Contact, index: number) : Promise<Reservation> {
    return this.getToken().then((token: TokenOuttripper) => this.da.setPax(token.organizationId, reservation.id, pax, index))
  }

  updateAvailableDate(date: AvailableDate, reservation: Reservation): void {
    this.getToken().then((token: TokenOuttripper) => {
      if (date.freeSpots === reservation.pax.length) { this.da.deleteAvailableDate(token.organizationId, date) } else {
        // eslint-disable-next-line no-param-reassign
        date.freeSpots -= reservation.pax.length
        this.da.updateAvailableDate(token.organizationId, date)
      }
    })
  }

  getPaymentsByInvoiceId(invoiceId: string): Promise<Payment[]> {
    return this.getToken().then((token: TokenOuttripper) => this.da.getPaymentsByInvoiceId(token.organizationId, invoiceId))
  }

  setAPayment(invoiceId: string, amount: number, kind: string, paymentDate: number, paymentReference: string): Promise<Payment> {
    const paymentId : string = voucherVodes.generate({
      length: 8,
      count: 1,
    })[0].toUpperCase()

    return this.getToken().then((token: TokenOuttripper) => {
      const payment : Payment = {
        id: paymentId,
        amount,
        date: new Date().getTime(),
        invoiceId,
        kind,
        paymentDate: paymentDate || new Date().getTime(),
        reference: paymentReference || '',
      }
      this.da.createPayment(token.organizationId, payment)


      this.da.getInvoice(token.organizationId, invoiceId).then((invoice: Invoice) => {
        let balance = amount

        const calculateAmount = (installmentBalance : number) : number => {
          const prevBalanceValue : number = balance

          if (balance === 0) return installmentBalance

          if ((installmentBalance - balance) < 0) {
            balance -= (installmentBalance - prevBalanceValue) * -1
            return 0
          }

          if ((installmentBalance - balance) > 0) {
            balance = 0
            return (installmentBalance - prevBalanceValue)
          }

          balance = 0
          return 0
        }

        // eslint-disable-next-line no-param-reassign
        invoice.installments = invoice.installments.map((installment: Installment) => {
          // eslint-disable-next-line no-param-reassign
          installment.amount = calculateAmount(installment.amount)
          return installment
        })

        this.da.updateInvoice(token.organizationId, invoice)
      })
      return payment
    })
  }

  getMyReservations(): Promise<Reservation[]> {
    return this.getToken().then((token: TokenOuttripper) => this.da.getMyReservations(token.organizationId))
  }

  // eslint-disable-next-line class-methods-use-this
  getNextInstallmentInDueDate(reservation: Reservation): Installment {
    const listInstallments = reservation.invoicesObject[0].installments.filter((i:Installment) => i.amount !== 0)

    if (listInstallments.length === 0) { return null }

    return listInstallments[0]
  }

  // eslint-disable-next-line class-methods-use-this
  getListPendingInstallments(reservation: Reservation) : Array<Installment> {
    return reservation.invoicesObject[0].installments.filter((i:Installment) => i.amount !== 0)
  }

  getDiffDaysForInstallmentNextDue = (reservation :Reservation) : number => {
    this.getNextInstallmentInDueDate(reservation)
    return moment(moment(this.getNextInstallmentInDueDate(reservation).dueDate)).diff(new Date(), 'days')
  }

  buildTerminsAndConditions = (installmentsList: Array<Installment>) : string => {
    const literal = `${installmentsList.length} payments, ${installmentsList.map((i: Installment) => (
      `${formatter.format(i.amount)} due on ${moment(i.dueDate).format('MMM, DD YYYY')}`
    )).join(', ')}`

    return literal
  }

  saveContact(contact: Contact): Promise<Contact> {
    return this.getToken().then(async (token:TokenOuttripper) => this.da.saveContact(token.organizationId, contact))
  }

  // eslint-disable-next-line class-methods-use-this
  getDuePaymentAmount(reservation: Reservation) : number {
    return reservation.amountOfPurchase - reservation.amountOfPayment
  }

  createInvite(email: string, roles: Array<Role>): Promise<Invitation> {
    return this.getToken().then((token: TokenOuttripper) => {
      const invitation = {
        emailDestination: email,
        organizationCN: token.organizationCn,
        organizationId: token.organizationId,
        sendBy: token.userCn,
        status: 'SEND',
        createdOn: new Date().getTime(),
        roles,
        id: null,
      } as Invitation
      return this.da.createInvitation(invitation)
    })
  }

  getInvitations(): Promise<Invitation[]> {
    return this.getToken().then((token: TokenOuttripper) => this.da.getInvitations(token.organizationId))
  }

  getRoles(): Promise<Role[]> {
    return this.da.getRoles()
  }

  createUser(user: User, invitation: Invitation): Promise<TokenOuttripper> {
    const promiseList = []

    promiseList.push(this.da.createUser(user))
    invitation.roles.forEach((role: Role) => {
      promiseList.push(this.da.addDealAccess(user, invitation.organizationId, role))
    })

    invitation.status = 'ACCEPTED'
    invitation.userCreated = user

    promiseList.push(this.da.updateInvitation(invitation))

    const token : TokenOuttripper = {
      id: uuidv4(),
      userCn: user.cn,
      organizationCn: 'TODO',
      organizationId: invitation.organizationId,
      photoAvatar: user.photoAvatar,
      rol: invitation.roles[0].id,
    }

    return Promise.all(promiseList).then(() => token)
  }

  getReservationAccessToken(id: string): Promise<ReservationToken> {
    return this.da.getReservationAccessToken(id)
  }

  createConsumerToken(reservationAccessToken: ReservationToken): Promise<TokenOuttripper> {
    const token : TokenOuttripper = {
      organizationId: reservationAccessToken.organizationId,
      organizationCn: reservationAccessToken.organizationCN,
      id: uuidv4(),
      userCn: 'Consumer',
      rol: 'CONSUMER',
      organizationKind: 'LODGE',
    }

    return this.da.setToken(token).then(() => token)
  }

  getOrganization(): Promise<Organization> {
    return this.getToken().then((token: TokenOuttripper) => this.da.getOrganization(token.organizationId))
  }
}


export default new BusinessService()

// export const businessService = new BusinessService()
