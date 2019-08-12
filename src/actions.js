export const ALL_ROOMS = 'ALL_ROOMS'

export function allRooms (payload) {
  return {
    type: ALL_ROOMS,
    payload
  }
}

export const ADD_USER = 'ADD_USER'

export function addUser (payload) {
  return {
    type: ADD_USER,
    payload
  }
}