import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { userReducer } from './reducers/users'
import { coreReducer, State as StateCore, initialState as initialStateCore } from './reducers/core'

export interface Store {
  settings: any
  loggedUser: {}
  core: StateCore
}

const initialState: Store = {
  settings: {},
  loggedUser: {},
  core: initialStateCore,
}

const reducers = combineReducers({
  loggedUser: userReducer,
  core: coreReducer,
})

export default () => createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
)
