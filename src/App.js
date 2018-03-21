import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
// Initialize Firebase
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
              <Link to='/'><div className="menuOption">Home</div></Link>
              <Link to='/RoomList'><div className="menuOption">Chat Rooms</div></Link>
            </nav>
          </div>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/RoomList" component={RoomList} />
        </main>
      </div>
    );
  }
}

export default App;
