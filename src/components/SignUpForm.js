import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

export default class SignUpForm extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  type="text"
                  name="userName"
                  value={this.props.userName}
                  onChange={this.props.onChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  value={this.props.email}
                  onChange={this.props.onChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="signUpPassword">Password</InputLabel>
                <Input
                  id="signUpPassword"
                  type="password"
                  name="password"
                  value={this.props.password}
                  onChange={this.props.onChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
        {this.props.errorMessage ? (
          <p className="error-message">{this.props.errorMessage}</p>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
