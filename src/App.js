import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import './App.css';
import Landing from './components/Landing';
import RoomList from './components/RoomList';

var config = {
  apiKey: "AIzaSyApIlz4UZgNlb9YpxbB9-_3VdcFzMimGdc",
  authDomain: "chat-app-react-d502e.firebaseapp.com",
  databaseURL: "https://chat-app-react-d502e.firebaseio.com",
  projectId: "chat-app-react-d502e",
  storageBucket: "chat-app-react-d502e.appspot.com",
  messagingSenderId: "415156342229"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div className="siteMenu">
            <nav>
              <div className="menuOption">Home</div>
              <div className="menuOption">Chat Rooms</div>
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
