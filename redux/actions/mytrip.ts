import {
  SET_MY_TRIP_GROUP_LEADER,
  SET_MY_TRIP_RESERVATION,
  SET_PAYMENT_COMMITMENT_KIND,
  SET_MY_TRIP_RESERVATION_TOKEN,
  SET_MY_TRIP_IS_GROUP_LEADER,
} from '../reducers/mytrip'


export const setMyTripGroupLeader = (contact :Contact) => (dispatch) => dispatch({
  type: SET_MY_TRIP_GROUP_LEADER,
  groupLeader: contact,
})


export const setMyTripReservation = (reservation :Reservation) => (dispatch) => dispatch({
  type: SET_MY_TRIP_RESERVATION,
  reservation,
})

export const setPaymentCommitmentKind = (kind :string) => (dispatch) => dispatch({
  type: SET_PAYMENT_COMMITMENT_KIND,
  paymentCommitmentKind: kind,
})

export const setMyTripReservationToken = (reservationAccessToken :ReservationToken) => (dispatch) => dispatch({
  type: SET_MY_TRIP_RESERVATION_TOKEN,
  reservationAccessToken,
})

export const setMyTripAreGroupLeader = (areGroupLeader :boolean) => (dispatch) => dispatch({
  type: SET_MY_TRIP_IS_GROUP_LEADER,
  areGroupLeader,
})
