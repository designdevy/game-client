import { serverUrl } from "./components/serverUrl";
import * as request from 'superagent'

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

export const JWT = "JWT"

function newLogin (payload) {
  return {
    type: JWT,
    payload
  }
}

export const login = (name, password) => dispatch => {
  const payload = {name, password}
  request
    .post(`${serverUrl}/logins`)
    .send(payload)
    .then(response => {
      const action = newLogin(response.body.jwt)
      dispatch(action)
    })
    .catch(console.error)
}