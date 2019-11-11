export const SET_AVAILABLE_DATE = 'SET_AVAILABLE_DATE'
export const SET_RESERVATION_HOLDER = 'SET_RESERVATION_HOLDER'
export const SET_GUEST_QTY = 'SET_GUEST_QTY'


export interface State {
  availableDate: AvailableDate
  guestQuantity: number
  reservationHolder: Contact
}

export interface Action {
  type: string
  availableDate: AvailableDate
  reservationHolder: Contact
  guestQuantity: number
}

export const initialState: State = {
  availableDate: null,
  guestQuantity: 1,
  reservationHolder: null,
}


export const reservationReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SET_GUEST_QTY:
      return { ...state, guestQuantity: action.guestQuantity }
    case SET_RESERVATION_HOLDER:
      return { ...state, reservationHolder: action.reservationHolder }
    case SET_AVAILABLE_DATE:
      return { ...state, availableDate: action.availableDate }
    default:
      return { ...state }
  }
}
