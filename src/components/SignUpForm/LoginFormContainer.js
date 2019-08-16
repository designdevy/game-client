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
      await this.props.login(this.state.name, this.state.password);
      if (!this.props.user.jwt){
        this.setState({
          name: "",
          password: "",
          errorMessage: 'Please supply a valid name and password or Sign Up'
        });
      } else {
        this.setState({
          name: "",
          password: ""
        });
      }
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
    user: state.user
  };
}

export default connect(
  MapStateToProps,
  { login }
)(LoginFormContainer);
