export const SET_AVAILABLE_DATE = 'SET_AVAILABLE_DATE'
export const SET_RESERVATION_HOLDER = 'SET_RESERVATION_HOLDER'
export const SET_GUEST_QTY = 'SET_GUEST_QTY'
export const SET_RESERVATION_LABEL = 'SET_RESERVATION_LABEL'
export const SET_DAYS_IN_HOLD = 'SET_DAYS_IN_HOLD'
export const SET_INSTALLMENTS = 'SET_INSTALLMENTS'
export const SET_PROGRAM_SELECTED = 'SET_PROGRAM_SELECTED'
export const SET_MONTH_AND_YEAR = 'SET_MONTH_AND_YEAR'
export const CLEAN_RESERVATION_STATE = 'CLEAN_RESERVATION_STATE'

export interface State {
  availableDate: AvailableDate
  guestQuantity: number
  reservationHolder: Contact,
  reservationLabel: string,
  daysInHold: number,
  installments: number
  programSelected: Program
  monthAndYearSelected: MonthAndYear
}

export interface Action {
  type: string
  availableDate: AvailableDate
  reservationHolder: Contact
  guestQuantity: number,
  label: string,
  daysInHold: number
  installments: number
  program: Program
  monthAndYear: MonthAndYear
}

export const initialState: State = {
  availableDate: null,
  guestQuantity: 1,
  reservationHolder: null,
  reservationLabel: '',
  daysInHold: 1,
  installments: 1,
  programSelected: null,
  monthAndYearSelected: null,
}


export const reservationReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case CLEAN_RESERVATION_STATE:
      return {
        ...initialState,
        programSelected: state.programSelected,
      }
    case SET_GUEST_QTY:
      return { ...state, guestQuantity: action.guestQuantity }
    case SET_RESERVATION_HOLDER:
      return { ...state, reservationHolder: action.reservationHolder }
    case SET_AVAILABLE_DATE:
      return { ...state, availableDate: action.availableDate }
    case SET_RESERVATION_LABEL:
      return { ...state, reservationLabel: action.label }
    case SET_DAYS_IN_HOLD:
      return { ...state, daysInHold: action.daysInHold }
    case SET_INSTALLMENTS:
      return { ...state, installments: action.installments }
    case SET_PROGRAM_SELECTED:
      return { ...state, programSelected: action.program }
    case SET_MONTH_AND_YEAR:
      return { ...state, monthAndYearSelected: action.monthAndYear }
    default:
      return { ...state }
  }
}
