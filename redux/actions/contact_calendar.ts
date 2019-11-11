import { NEW_CONTACT, SET_CALLING_PAGE } from '../reducers/contact_calendar'

export const newContact = (contact: Contact) => (dispatch, getState) => {
  const { user } = getState().loggedUser

  const contactToSave = contact
  contactToSave.owner = user.organization
  return dispatch({
    type: NEW_CONTACT,
    contactSelected: contact,
  })
}

export const setCallingPage = (page: string) => (dispatch) => dispatch({
  type: SET_CALLING_PAGE,
  callingPage: page,
})

export const selectContact = () => console.log('TODO')
