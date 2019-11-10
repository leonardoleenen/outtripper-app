import { SET_DESTINATION } from '../reducers/core'

export const setDestination = (destination: Destination) => (dispatch) => dispatch({
  type: SET_DESTINATION,
  destination,
})

export const fake = () => console.log('')
