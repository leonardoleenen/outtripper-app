export const SET_USER = 'SET_USER'
export const UNSET_USER = 'UNSET_USER'

export interface State {
  user: User
}

export const userReducer = (state : State = { user: null }, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user }
    case UNSET_USER:
      return { ...state, user: null }
    default:
      return { ...state }
  }
}
