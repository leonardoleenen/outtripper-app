import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { userReducer } from './reducers/users'

export interface Store {
    settings: any
}

const initialState : Store = {
  settings: {},
}

export const settingReducer = (state = initialState.settings, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const reducers = combineReducers({
  settings: settingReducer,
  loggedUser: userReducer,
})

export function initializeStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  )
}
