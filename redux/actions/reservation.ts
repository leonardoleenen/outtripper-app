import {
  SET_AVAILABLE_DATE, SET_RESERVATION_HOLDER, SET_GUEST_QTY, Action, SET_RESERVATION_LABEL, SET_DAYS_IN_HOLD, SET_INSTALLMENTS, SET_PROGRAM_SELECTED, SET_MONTH_AND_YEAR,
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

export const setDaysInHold = (daysInHold: number) => (dispatch) => dispatch({
  type: SET_DAYS_IN_HOLD,
  daysInHold,
})

export const setInstallments = (installments: number) => (dispatch) => dispatch({
  type: SET_INSTALLMENTS,
  installments,
})

export const setProgram = (program: Program) => (dispatch) => dispatch({
  type: SET_PROGRAM_SELECTED,
  program,
})

export const setMonthAndYear = (monthAndYear: MonthAndYear) => (dispatch) => dispatch({
  type: SET_MONTH_AND_YEAR,
  monthAndYear,
})
