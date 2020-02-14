import {
  NEW_CONTACT, SET_CALLING_PAGE, SET_CONTACT, HOLDER_IS_A_PARTY_MEMBER, UNSET_CONTACT,
} from '../reducers/contact_calendar'
import businessService from '../../services/business'


export const newContact = (contact: Contact) => (dispatch, getState) => {
  businessService.saveContact(contact)

  return dispatch({
    type: NEW_CONTACT,
    contactSelected: contact,
  })
}

export const setCallingPage = (page: string) => (dispatch) => dispatch({
  type: SET_CALLING_PAGE,
  callingPage: page,
})

export const setContact = (contact: Contact) => (dispatch) => dispatch({
  type: SET_CONTACT,
  contactSelected: contact,
})

export const unSetContact = () => (dispatch) => dispatch({
  type: UNSET_CONTACT,
  contactSelected: null,
})

export const setHolderIsAPartyMember = (isAPartyMember: boolean) => (dispatch) => dispatch({
  type: HOLDER_IS_A_PARTY_MEMBER,
  isAPartyMember,
})
