import { SET_CALL_PAYMENT_FROM, SET_MEDIA_PAYMENT } from '../reducers/payment'


export const setCallingFrom = (callingFrom: string) => (dispatch) => dispatch({
  type: SET_CALL_PAYMENT_FROM,
  callingFrom,
})

export const setMediaPayment = (mode: string) => (dispatch) => dispatch({
  type: SET_MEDIA_PAYMENT,
  mode,
})
