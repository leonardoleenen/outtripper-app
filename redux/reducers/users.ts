export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export interface State {
  token: TokenOuttripper
}

export const initialState = {
  token: null,
}

export const userReducer = (state : State = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.token }
    default:
      return { ...state }
  }
}
