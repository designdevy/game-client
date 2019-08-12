import { ALL_ROOMS } from '../actions'

export default function rooms (state = [], action = {}) {
  switch(action.type) {
    case ALL_ROOMS:
      return action.payload;
    default:
      return state
  }
}