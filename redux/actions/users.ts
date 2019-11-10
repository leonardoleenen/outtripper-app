import { SET_USER, UNSET_USER } from '../reducers/users'

export const login = (user: User) => (dispatch) => dispatch({
  type: SET_USER,
  user,
})

export const logout = () => (dispatch) => dispatch({
  type: UNSET_USER,
})
