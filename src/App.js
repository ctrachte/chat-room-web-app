import React, { Component } from 'react';
import logo from './logo.svg';
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
