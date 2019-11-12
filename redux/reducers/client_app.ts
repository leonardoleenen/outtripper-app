import { MyTrip } from '../../services/type'

export const LOAD_CURRENT_TRIP = 'LOAD_CURRENT_TRIP'

export interface IAction {
    type: string
    currentTrip?: ICurrentTrip
}

interface ICurrentTrip {
    trip: MyTrip
}

export interface IState {
    trips: Array<MyTrip>
    currentTrip: ICurrentTrip
}

export const clientAppReducer = (state: IState = { trips: [], currentTrip: null }, action:IAction) => {
  switch (action.type) {
    case LOAD_CURRENT_TRIP:
      return { ...state, current_trip: action.currentTrip }
    default:
      return { ...state, ...action }
  }
}
