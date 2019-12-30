
export const NEW_CONTACT = 'NEW_CONTACT'
export const SET_CALLING_PAGE = 'SET_CALLING_PAGE'
export const SET_CONTACT = 'SET_CONTACT'
export const HOLDER_IS_A_PARTY_MEMBER = 'HOLDER_IS_A_PARTY_MEMBER'

export interface State {
  contactSelected: Contact
  callingPage: string
  holderIsAPartyMember: boolean
}

interface Action {
  type: string
  contactSelected: Contact
  callingPage: string
  isAPartyMember
}

export const initialState : State = {
  contactSelected: null,
  callingPage: null,
  holderIsAPartyMember: true,
}

export const contactCalendarReducer = (state: State = initialState, action: Action) : State => {
  switch (action.type) {
    case NEW_CONTACT:
      return { ...state, contactSelected: action.contactSelected }
    case SET_CALLING_PAGE:
      return { ...state, callingPage: action.callingPage }
    case SET_CONTACT:
      return { ...state, contactSelected: action.contactSelected }
    case HOLDER_IS_A_PARTY_MEMBER:
      return { ...state, holderIsAPartyMember: action.isAPartyMember }
    default:
      return { ...state }
  }
}
