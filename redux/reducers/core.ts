export const SET_DESTINATION = 'SET_DESTINATION'

export interface State {
  destination: Destination
}

interface Action {
  type: string
  destination:Destination
  contact: Contact
}

export const initialState : State = {
  destination: null,
}

export const coreReducer = (state: State = initialState, action: Action) : State => {
  switch (action.type) {
    case SET_DESTINATION:
      return { ...state, destination: action.destination }
    default:
      return { ...state }
  }
}
