import React from 'react';

export default class SignUpForm extends React.Component {
  render() {
    return <form onSubmit={this.props.onSubmit}>
      <h3>Sign up:</h3>
      <input
        type="text"
        name="userName"
        value={this.props.userName}
        placeholder="name"
        onChange={this.props.onChange}
      />
      <input
        type="text"
        name="email"
        value={this.props.email}
        placeholder="e-mail"
        onChange={this.props.onChange}
      />
      <input
        type="password"
        name="password"
        value={this.props.password}
        placeholder="password"
        onChange={this.props.onChange}
      />
      <button>Add</button>
    </form>;
  }
}
