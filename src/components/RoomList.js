import React from "react";
import { connect } from "react-redux";
import superagent from "superagent";
import { serverUrl } from "./serverUrl";
import { addUser } from "../actions";
import { Redirect } from "react-router-dom";
import gameTypes from './Game/gameTypes'
import SignUpForm from "./SignUpForm";
// import Tutorial from "./Game/"
import LoginFormContainer from "./SignUpForm/LoginFormContainer";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Paper } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`user-loginpanel-${index}`}
      aria-labelledby={`user-login-${index}`}
      {...other}
    >
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `user-login-${index}`,
    'aria-controls': `user-loginpanel-${index}`,
  };
}


class RoomList extends React.Component {
  state = {
    roomName: '',
    userName: '',
    type: 1,
    email: '',
    password: '',
    redirect: false,
    roomId: "",
    tabValue: 0,
  };

  handleChangeTab = (event, newValue) => {
    this.setState({
      tabValue: newValue
    });
  }

  handleClickJoin = async event => {
    event.preventDefault();

    this.setState({
      redirect: true,
      roomId: event.target.value
    });

    await superagent.put(`${serverUrl}/rooms/${event.target.value}`).send({
      roomId: event.target.value,
      userId: this.props.user.id
    });
  };

  handleChangeRoom = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmitRoom = async event => {
    event.preventDefault();

    const roomName = this.state.roomName === ''
      ? null
      : this.state.roomName

    await superagent.post(`${serverUrl}/rooms`).send({
      name: roomName,
      type: this.state.type
    });
    this.setState({
      roomName: ""
    });
  };

  handleChangeUser = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmitUser = async event => {
    event.preventDefault();

    const name = this.state.userName === ''
      ? null
      : this.state.userName
    
    const email = this.state.email === ''
      ? null
      : this.state.email
    
    const password = this.state.password === ''
      ? null
      : this.state.password

    await superagent
      .post(`${serverUrl}/users`)
      .send({
        name,
        email,
        password
      })
      .then(response => this.props.addUser(response.body));
    this.setState({
      userName: "",
      email: "",
      password: ""
    });
  };

  renderRedirect = id => {
    if (this.state.redirect === true) {
      return <Redirect to={`/rooms/${id}`} />;
    } else {
      return <h1 className="game-title">ME+YOU</h1>;
    }
  };

  render() {
    const rooms = this.props.rooms.map(room => (
      <div key={room.id}>
        <Grid container justify="center" spacing={10}>
          <Grid item xs={12} sm={8} md={10} lg={10}>
            <Paper className="room-item">
              <h3>{room.name}</h3>
              {room.users.length === 2 || room.stage !== 5
                ? <p>game in progress...</p> 
                  : <div>
                      <p>Game type: <b>{gameTypes(room.type)}</b>. Players in the room: <b>{room.users.length}</b></p>
                      <button
                        className="MuiButtonBase-root MuiButton-root join-room-btn MuiButton-contained MuiButton-containedPrimary"
                        variant="contained"
                        color="primary" 
                        value={room.id}
                        onClick={this.handleClickJoin}>
                        Join
                      </button>
                    </div>
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
    ));

    let roomListBody = (
      <div className="user-form">
        <Grid container justify="center" spacing={10}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <AppBar position="static">
              <Tabs
                value={this.state.tabValue}
                onChange={this.handleChangeTab}
                variant="fullWidth"
                aria-label="user-login"
              >
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Sign up" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.tabValue} index={0}>
              <LoginFormContainer />
            </TabPanel>
            <TabPanel value={this.state.tabValue} index={1}>
              <SignUpForm
                onSubmit={this.handleSubmitUser}
                onChange={this.handleChangeUser}
                userName={this.state.userName}
                email={this.state.email}
                password={this.state.password}
              />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    );

    if (this.props.user !== "Anonymos") {
      console.log("this.props.user", this.props.user);
      roomListBody = (
        <div>
          <Grid container justify="center" spacing={10}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Paper className="game-lobby">
                <h2>Name: {this.props.user.name}</h2>
                <h2>Games won: {this.props.user.won}</h2>
                <h2>Games failed: {this.props.user.failed}</h2>
                <form onSubmit={this.handleSubmitRoom}>
                  <h2>Create a new room</h2>
                  <FormControl className="game-type">
                    <Select
                      native
                      onChange={this.handleChangeRoom}
                      input={
                        <OutlinedInput name="type" id="game-type" />
                      }
                    >
                      <option value={1}>Numbers</option>
                      <option value={2}>Shapes</option>
                      <option value={3}>Emoji</option>
                      <option value={4}>Colors</option>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-name"
                    label="Room name"
                    name="roomName"
                    value={this.state.roomName}
                    onChange={this.handleChangeRoom}
                    margin="normal"
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    className="add-room-btn"
                    variant="contained"
                    color="primary"
                  >
                    Add
                  </Button>
                </form>
                <h2>Available Rooms</h2>
                {rooms}
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div className="rooms">
        {this.renderRedirect(this.state.roomId)}
        {roomListBody}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { addUser }
)(RoomList);
