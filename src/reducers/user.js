import { ADD_USER } from '../actions'

export default function user (state='Anonymos', action = {}) {
  switch(action.type){
    case ADD_USER:
      return action.payload
    default:
      return state
  }
}