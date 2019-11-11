import { NEW_CONTACT, SET_CALLING_PAGE } from '../reducers/contact_calendar'
import businessService from '../../services/business'


export const newContact = (contact: Contact) => (dispatch, getState) => {
  const { user } = getState().loggedUser

  const contactToSave = contact
  contactToSave.owner = user.organization
  businessService.saveContact(contactToSave, user)

  return dispatch({
    type: NEW_CONTACT,
    contactSelected: contact,
  })
}

export const setCallingPage = (page: string) => (dispatch) => dispatch({
  type: SET_CALLING_PAGE,
  callingPage: page,
})
