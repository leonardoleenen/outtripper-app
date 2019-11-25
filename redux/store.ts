import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { userReducer, State as StateUser, initialState as initialStateUser } from './reducers/users'
import { reservationReducer, State as StateReservation, initialState as InitialStateReservation } from './reducers/reservation'
import { contactCalendarReducer, State as StateContactCalendar, initialState as initialStateContactCalendar } from './reducers/contact_calendar'


import { coreReducer, State as StateCore, initialState as initialStateCore } from './reducers/core'


export interface StoreData {
  user: StateUser,
  core: StateCore,
  reservation: StateReservation,
  contactCalendar: StateContactCalendar
}

const initialState: StoreData = {
  user: initialStateUser,
  core: initialStateCore,
  reservation: InitialStateReservation,
  contactCalendar: initialStateContactCalendar,
}

const reducers = combineReducers({
  loggedUser: userReducer,
  core: coreReducer,
  reservation: reservationReducer,
  contactCalendar: contactCalendarReducer,
})


export default () => createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
)
