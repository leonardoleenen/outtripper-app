export const SET_USER = 'SET_USER'
export const UNSET_USER = 'UNSET_USER'

export const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user }
    case UNSET_USER:
      return { ...state, user: null }
    default:
      return { ...state }
  }
}
