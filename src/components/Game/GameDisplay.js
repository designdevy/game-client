import React from 'react';
import { Link } from 'react-router-dom'

export default function GameDisplay (props) {
  return (
  <div>
    <h1>Game:</h1>
    {props.room.users.length === 2 ? 
    <button>Start</button> : 
    <p>Waiting for the other player</p>}
    <Link to='/'>Quit the game</Link>
  </div>
  )
}