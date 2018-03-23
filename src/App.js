import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import ActiveRoom from './components/ActiveRoom';
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
          activeRoom:"room1"
        };
  }
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <main>
          <ActiveRoom
          firebase={firebase}
          />
          <RoomList firebase={firebase}/>
          <MessageList firebase={firebase}/>
        </main>
      </div>
    );
  }
}

export default App;
