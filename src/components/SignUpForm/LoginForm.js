import React from 'react';

export default function LogInForm (props) {
    return <form onSubmit={props.onSubmit}>
      <h3>Log in to create a new room:</h3>
      <input
        type="text"
        name="name"
        value={props.userName}
        placeholder="name"
        onChange={props.onChange}
      />
      <input
        type="password"
        name="password"
        value={props.password}
        placeholder="password"
        onChange={props.onChange}
      />
      <button>Login</button>
    </form>;
}
