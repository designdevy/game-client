import React from "react";
import { allRooms } from "./actions";
import { connect } from "react-redux";
import { Route } from 'react-router-dom'
import RoomList from "../src/components/RoomList";
// import Room from "./components/UserForm";
import "./App.css";

const serverUrl =
  "https://polar-sands-55886.herokuapp.com/stream" ||
  "http://localhost:5000/stream";

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
      <Route exact patah ='/' component={RoomList} />
      {/* <Route path='/rooms/:id' component={Room} /> */}
    </div>
  }
}


export default connect(
  null,
  { allRooms }
)(App);
