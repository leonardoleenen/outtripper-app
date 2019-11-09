import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';


export interface Store {
    settings: any
}

const initialState : Store= {
  settings:{},
}

export const settingReducer = (state = initialState.settings, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const reducers = combineReducers({
  settings: settingReducer,
});

export function initializeStore (initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}