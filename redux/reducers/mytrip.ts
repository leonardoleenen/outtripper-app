import { PAYMENT_COMMITMENT_KIND } from '../../services/business'

export const SET_MY_TRIP_RESERVATION = 'SET_MY_TRIP_RESERVATION'
export const SET_MY_TRIP_GROUP_LEADER = 'SET_MY_TRIP_GROUP_LEADER'
export const SET_PAYMENT_COMMITMENT_KIND = 'SET_PAYMENT_COMMITMENT_KIND'
export const SET_MY_TRIP_RESERVATION_TOKEN = 'SET_MY_TRIP_RESERVATION_TOKEN'

export interface State {
  groupLeader: Contact,
  reservation: Reservation
  reservationAccessToken : ReservationToken
  paymentCommitmentKind: PAYMENT_COMMITMENT_KIND
  areGroupLeader : boolean
}

export const initialState = {
  groupLeader: null,
  reservation: null,
  reservationAccessToken: null,
  paymentCommitmentKind: null,
  areGroupLeader: false,
}

export const myTripReducer = (state : State = initialState, action) => {
  switch (action.type) {
    case SET_MY_TRIP_RESERVATION_TOKEN:
      return { ...state, reservationAccessToken: action.reservationAccessToken }
    case SET_PAYMENT_COMMITMENT_KIND:
      return { ...state, paymentCommitmentKind: action.paymentCommitmentKind }
    case SET_MY_TRIP_RESERVATION:
      return { ...state, reservation: action.reservation }
    case SET_MY_TRIP_GROUP_LEADER:
      return {
        ...state,
        groupLeader: action.groupLeader,
      }
    default:
      return { ...state }
  }
}
