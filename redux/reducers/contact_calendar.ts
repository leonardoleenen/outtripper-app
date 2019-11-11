export const NEW_CONTACT = 'NEW_CONTACT'
export const SET_CALLING_PAGE = 'SET_CALLING_PAGE'

export interface State {
  contactSelected: Contact
  callingPage: string
}

interface Action {
  type: string
  contactSelected: Contact
  callingPage: string
}

export const initialState : State = {
  contactSelected: null,
  callingPage: null,
}

export const contactCalendarReducer = (state: State = initialState, action: Action) : State => {
  switch (action.type) {
    case NEW_CONTACT:
      return { ...state, contactSelected: action.contactSelected }
    case SET_CALLING_PAGE:
      return { ...state, callingPage: action.callingPage }
    default:
      return { ...state }
  }
}
