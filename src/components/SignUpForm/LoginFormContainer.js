import React from "react";
import { login } from "../../actions";
import { connect } from "react-redux";
import LogInForm from "./LoginForm";

class LoginFormContainer extends React.Component {
  state = {
    name: "",
    password: "",
    errorMessage: null
  };

  handleChangeUser = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmitUser = async event => {
    event.preventDefault();
    if (this.state.name !== '' && this.state.password !== '') {
      this.props.login(this.state.name, this.state.password);
      this.setState({
        name: "",
        password: ""
      });
    } else {
      this.setState({ errorMessage: 'Please supply a valid name and password'})
    }
  };

  render() {
    return <LogInForm 
    onSubmit={this.handleSubmitUser} 
    onChange={this.handleChangeUser} 
    userName={this.state.name}
    password={this.state.password}
    errorMessage={this.state.errorMessage}
    />
  }
}

function MapStateToProps(state) {
  return {
    errorMessage: state.errorMessage
  };
}

export default connect(
  MapStateToProps,
  { login }
)(LoginFormContainer);
