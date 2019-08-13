import React from 'react';
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

export default function LogInForm (props) {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="userName">Username</InputLabel>
              <Input
              id="userName"
              type="text"
              name="userName"
              value={props.userName}
              onChange={props.onChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
              id="password"
              type="password"
              name="password"
              value={props.password}
              onChange={props.onChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
