import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import AppHeader from './components/AppHeader';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: "AIzaSyDu2J3W06iZPskgdnT1_25vqRZbRd8IUrs",
  authDomain: "chat-app-react-2.firebaseapp.com",
  databaseURL: "https://chat-app-react-2.firebaseio.com",
  projectId: "chat-app-react-2",
  storageBucket: "chat-app-react-2.appspot.com",
  messagingSenderId: "727916702140"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
        this.state = {
          activeRoom:"room1",
          currentUser: ""
        };
        this.changeRoom = this.changeRoom.bind(this);
        this.setUser = this.setUser.bind(this);
  }

  changeRoom (event) {
    event.preventDefault();
    this.setState({activeRoom: event.target.id});
  }

  setUser (user) {
    this.setState({currentUser: user});
  }


  render() {
    return (
      <div className="App">
        <header>
        </header>
        <main>
          <AppHeader
          setUser={this.setUser}
          firebase={firebase}
          currentUser={this.state.currentUser}
          />
          <MessageList
            activeRoom={this.state.activeRoom}
            firebase={firebase}
          />
          <RoomList
            firebase={firebase}
            changeRoom={this.changeRoom}
          />
        </main>
      </div>
    );
  }
}

export default App;
