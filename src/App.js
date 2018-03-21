import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import Landing from './components/Landing';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header>
          <div className="siteMenu">
            <nav>
              <span className="menuOption">Home</span>
              <span className="menuOption">Chat Rooms</span>
            </nav>
          </div>
        </header>
        <main>
          <Landing/>
          <RoomList firebase={firebase}/>
        </main>
      </div>
    );
  }
}

export default App;
