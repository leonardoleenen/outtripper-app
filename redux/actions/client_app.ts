
import { MyTrip } from '../../services/type'
import { LOAD_CURRENT_TRIP } from '../reducers/client_app'

const setMyCurrentTrip = (myTrip: MyTrip) => (dispatch) => dispatch({
  type: LOAD_CURRENT_TRIP,
  current_trip: myTrip,
})

export { setMyCurrentTrip as default }
