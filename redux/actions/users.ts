import { LOGIN, LOGOUT } from '../reducers/users'

export const login = (token: TokenOuttripper) => (dispatch) => dispatch({
  type: LOGIN,
  token,
})

export const logout = () => (dispatch) => dispatch({
  type: LOGOUT,
  token: null,
})
