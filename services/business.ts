import uuidv4 from 'uuid4'
import axios from 'axios'
import getConfig from 'next/config'
import moment from 'moment'
import dataAccessService, { DataAccessService } from './database'

const { publicRuntimeConfig: { API_SERVER } } = getConfig()

interface Services {
  getDestinations(): Promise<Array<Destination>>
  getPrograms(organtizationId: string) : Promise<Array<Program>>
  getAvailability(year: number) : Promise<Array<AvailableDate>>

  getContacts() : Promise<Array<Contact>>
  generateUniversalId(user: User): string
  saveContact(contact: Contact, user: User) : void
  getNotifications() : Promise<Array<SystemNotification>>
  getInvitation(id: string): Promise<Invitation>
  login(uid:string, cn:string, email:string, photoAvatar?:string) : Promise<TokenOuttripper>
  getToken() : Promise<TokenOuttripper>
}


class BusinessService implements Services {
  saveContact(contact: Contact, user: User): void {
    const contactToSave = contact
    contactToSave.owner = user.organization
    contactToSave.collectionKind = 'contact'
    contactToSave.id = this.generateUniversalId(user)
    this.da.saveContact(contactToSave)
  }


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
    return this.getToken().then((token) => this.outtripperServer.get(`${API_SERVER}/getContactsCalendar`, { headers: { Authorization: `Basic ${btoa(JSON.stringify(token))}` } })
      .then((result) => result.data))

    // this.outtripperServer.get(`${API_SERVER}getContactsCalendar`, { headers: { Authorization: `Basic ${btoa(JSON.stringify(token))}` } }).then((result) => result.data as Array<Contact>)
  }


  getPrograms(organizationId: string): Promise<Program[]> {
    return this.da.getPrograms(organizationId)
  }

  getDestinations(): Promise<Array<Destination>> {
    return this.da.getDestinations()
  }

  // eslint-disable-next-line class-methods-use-this
  mergeAvailability(emptyAvailability: any) : Promise<Array<AvailableDate>> {
    // eslint-disable-next-line no-return-assign
    // eslint-disable-next-line no-param-reassign
    const mergedResult = emptyAvailability

    return this.getToken().then((token) => this.outtripperServer.get(`${API_SERVER}/getAvailability`, { headers: { Authorization: `Basic ${btoa(JSON.stringify(token))}` } })
      .then((result) => {
        // console.log(result.data)
        let month = 0
        let day = 0
        result.data.forEach((v) => {
          // console.log(moment(v.to).diff(moment(v.from), 'days'))

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
    console.log(feb, year)

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
    /* return [{
      month: 1,
      year,
      days: [{
        day: 1,
        availability: null,
      }, {
        availability: [{
          program: 'FULLWEEK',
          spots: 4,
          price: 6400,
        }],
      }, {
        day: 3,
        availability: null,
      },
      {
        day: 4,
        availability: null,
      }, {
        day: 5,
        availability: null,
      }, {
        day: 6,
        availability: null,
      }],
    }]
  } */
  }
}

export default new BusinessService()

// export const businessService = new BusinessService()
