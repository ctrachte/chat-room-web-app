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
          currentUser: "",
          currentUserId:"",
          isSiteAdmin:false,
          isActiveRoomAdmin:false,
          isRoomPrivate:false,
        };
        this.changeRoom = this.changeRoom.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setRoomPriv = this.setRoomPriv.bind(this);
        this.usersRef  = firebase.database().ref('users');
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
  }

  signIn (event) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider );
  }

  signOut (event) {
    firebase.auth().signOut();
    window.location.reload();
    this.setUser("");
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

  setRoomPriv (user, privacy, admins) {
    this.setState({isRoomPrivate:privacy, activeRoomAdmins:admins});
    let isAdmin = false;
    for (var i=0; i <=admins.length; i++) {
      if (admins[i] === user) {
          isAdmin = true;
          break;
      }
    };
    this.setState({isActiveRoomAdmin:isAdmin});
  }

  setUser (user) {
    this.setState({ currentUser: user });
    if (this.state.currentUser) {
     this.setState({ isSiteAdmin: (this.state.currentUser.displayName==="Caleb Trachte" ? true : false) });
   }
  }

  render() {
    return (
      <div className="App mdl-layout mdl-js-layout">
        <header className="mdl-layout__header mdl-layout__header--scroll">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Title</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
            </nav>
          </div>
          <AppHeader
          signIn={this.signIn}
          signOut={this.signOut}
          isSiteAdmin={this.state.isSiteAdmin}
          setUser={this.setUser}
          firebase={firebase}
          currentUser={this.state.currentUser}
          />
          <div class="mdl-layout-spacer"></div>

        </header>
        <div class="mdl-layout__drawer">
          <span class="mdl-layout-title">Rooms</span>
          <nav class="mdl-navigation">
            {this.state.currentUser ?
            <RoomList
              isRoomAdmin={this.state.isActiveRoomAdmin}
              isRoomPrivate={this.state.isRoomPrivate}
              setRoomPriv={this.setRoomPriv}
              isSiteAdmin={this.state.isSiteAdmin}
              currentUser={this.state.currentUser}
              activeRoom={this.state.activeRoom}
              firebase={firebase}
              changeRoom={this.changeRoom}
            />
             : null
           }
          </nav>
        </div>
        <main className="mdl-layout__content">

          <div className="page-content">
           {this.state.currentUser && this.state.activeRoom ?
           <MessageList
             isRoomPrivate={this.state.isRoomPrivate}
             timeChange={this.timeChange}
             activeRoom={this.state.activeRoom}
             firebase={firebase}
             currentUser={this.state.currentUser}
             isActiveRoomAdmin={this.state.isActiveRoomAdmin}
           />
             :  null
           }
          </div>
        </main>
      </div>
    );
  }
}

export default App;
