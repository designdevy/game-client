import React from "react";
import { connect } from "react-redux";
import superagent from "superagent";
import { serverUrl } from "./serverUrl";
import { addUser } from "../actions";
import { Redirect } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginFormContainer from "./SignUpForm/LoginFormContainer";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


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
    roomName: "",
    userName: "",
    email: "",
    password: "",
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
    console.log("event.target.value", event.target.value);

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
      roomName: event.target.value
    });
  };

  handleSubmitRoom = async event => {
    event.preventDefault();
    await superagent.post(`${serverUrl}/rooms`).send({
      name: this.state.roomName
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
    await superagent
      .post(`${serverUrl}/users`)
      .send({
        name: this.state.userName,
        email: this.state.email,
        password: this.state.password
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
      return <h2>Game Lobby</h2>;
    }
  };

  render() {
    const rooms = this.props.rooms.map(room => (
      <div key={room.id}>
        <p>{room.name}</p>
        {room.users.length === 2 ? (
          <p>game in progress...</p>
        ) : (
          <div>
            <p>Number of players in the game now: {room.users.length}</p>
            <button value={room.id} onClick={this.handleClickJoin}>
              Join
            </button>
          </div>
        )}
      </div>
    ));
    
    let roomListBody = <div className="user-form">
                        <AppBar position="static">
                          <Tabs
                            value={this.state.tabValue}
                            onChange={this.handleChangeTab}
                            variant="fullWidth"
                            aria-label="user-login">
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
                      </div>
    
    if (this.props.user !== 'Anonymos') {
      roomListBody = <div>
                      <h3>Available Rooms:</h3>
                      {rooms}
                      <form onSubmit={this.handleSubmitRoom}>
                        <h3>Create a new room:</h3>
                        <input
                          type="text"
                          name="roomName"
                          value={this.state.roomName}
                          placeholder="room name"
                          onChange={this.handleChangeRoom}
                        />
                        <button>Add</button>
                      </form>
                    </div>
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
