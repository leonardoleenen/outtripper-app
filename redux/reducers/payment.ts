export const SET_MEDIA_PAYMENT = 'SET_MEDIA_PAYMENT'
export const SET_CALL_PAYMENT_FROM = 'SET_CALL_PAYMENT_FROM'

export enum PaymentMode {
  CREDITCARD='CREDIT CARD',
  WIRETRANSFER ='WIRE TRANSFER'
}

export interface State {
  mode: PaymentMode
  callingFrom : string
  paymentMedia: CreditCard | WireTransfer
}

export const initialState = {
  mode: PaymentMode.CREDITCARD,
  callingFrom: null,
  paymentMedia: null,
}

export const paymentReducer = (state : State = initialState, action) => {
  switch (action.type) {
    case SET_MEDIA_PAYMENT:
      return { ...state, mode: action.mode }
    case SET_CALL_PAYMENT_FROM:
      return { ...state, callingFrom: action.callingFrom }
    default:
      return { ...state }
  }
}
