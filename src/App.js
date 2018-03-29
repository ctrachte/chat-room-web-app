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
          activeRoom:"",
          currentUser: ""
        };
        this.changeRoom = this.changeRoom.bind(this);
        this.setUser = this.setUser.bind(this);
  }

  timeChange () {
    let today = new Date();
    // Hours part from the timestamp
    var hours = today.getHours();
    // Minutes part from the timestamp
    var minutes = (String(today.getMinutes()).length > 1) ? String(today.getMinutes()) : String("0" + today.getMinutes());
    // Will display time in military format
    var formattedTime = hours + ':' + minutes.substr(-6);
    //concat the new date to return
    var newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " at " + formattedTime + " CST ";
    return newDate;
  }

  changeRoom (event) {
    this.setState({activeRoom: event.target.innerHTML});
  }

  setUser (user) {
    this.setState({currentUser: user});
  }

  refresh () {
    window.location.reload();
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
          {this.state.currentUser && this.state.activeRoom ?
          <MessageList
            timeChange={this.timeChange}
            activeRoom={this.state.activeRoom}
            firebase={firebase}
            currentUser={this.state.currentUser}
            refresh={this.refresh}
          />
            : null
          }
          <RoomList
            currentUser={this.state.currentUser}
            activeRoom={this.state.activeRoom}
            firebase={firebase}
            changeRoom={this.changeRoom}
          />
        </main>
      </div>
    );
  }
}

export default App;
