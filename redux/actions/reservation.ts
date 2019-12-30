import {
  SET_AVAILABLE_DATE, SET_RESERVATION_HOLDER, SET_GUEST_QTY, Action, SET_RESERVATION_LABEL,
} from '../reducers/reservation'


export const setAvailableDate = (date: AvailableDate) => (dispatch) => dispatch({
  type: SET_AVAILABLE_DATE,
  availableDate: date,
})

export const setReservationHolder = (reservationHolder: Contact) => (dispatch) => dispatch({
  type: SET_RESERVATION_HOLDER,
  reservationHolder,
})

export const setGuestQuantity = (quantity: number) => (dispatch) => dispatch({
  type: SET_GUEST_QTY,
  guestQuantity: quantity,
} as Action)

export const setReservationLabel = (label: string) => (dispatch) => dispatch({
  type: SET_RESERVATION_LABEL,
  label,
})
