import React from "react";
import { allRooms } from "./actions";
import { connect } from "react-redux";
import { Route } from 'react-router-dom'
import RoomList from "../src/components/RoomList";
import "./App.css";
import GameContainer from "./components/Game/GameContainer";

// const serverUrl = "https://polar-sands-55886.herokuapp.com/stream";
const serverUrl = "http://localhost:5000/stream";

class App extends React.Component {
  source = new EventSource(serverUrl);

  componentDidMount() {
    this.source.onmessage = event => {
      const rooms = JSON.parse(event.data);

      this.props.allRooms(rooms);
    };
  }

  render() {
    return <div>
      <Route exact path ='/' component={RoomList} />
      <Route path='/rooms/:id' component={GameContainer} />
    </div>
  }
}


export default connect(
  null,
  { allRooms }
)(App);
