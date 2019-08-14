import React from "react";
import { login } from "../../actions";
import { connect } from "react-redux";
import LogInForm from "./LoginForm";

class LoginFormContainer extends React.Component {
  state = {
    name: "",
    password: ""
  };

  handleChangeUser = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmitUser = async event => {
    event.preventDefault();
    this.props.login(this.state.name, this.state.password);
    this.setState({
      name: "",
      password: ""
    });
  };

  render() {
    return <LogInForm 
    onSubmit={this.handleSubmitUser} 
    onChange={this.handleChangeUser} 
    userName={this.state.name}
    password={this.state.password}
    />
  }
}

export default connect(
  null,
  { login }
)(LoginFormContainer);
