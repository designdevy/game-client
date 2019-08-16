import React from "react";
import { allRooms } from "./actions";
import { connect } from "react-redux";
import { Route } from 'react-router-dom'
import RoomList from "../src/components/RoomList";
import { serverUrl } from "./components/serverUrl";
import "./App.css";
import GameContainer from "./components/Game/GameContainer";

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
