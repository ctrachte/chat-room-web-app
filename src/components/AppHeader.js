import React, { Component } from 'react';

class AppHeader extends Component  {
  constructor(props) {
    super(props);
        this.state = {
          conversations:[]
        };
        this.activeRoomId = this.props.activeRoomId;
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn (event) {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut (event) {
    this.props.firebase.auth().signOut();
    let user = "";
    this.props.setUser(user);
  }

  welcomeUser () {
    if (this.props.currentUser) {
      return "Welcome " +  this.props.currentUser.displayName;
    } else {
      return "Please sign in to your google account to view chat rooms and messages.";
    }
  }

  render() {
    return (
      <section className="header">
        <div align="center" className="messages">
          <h2>React Chat App</h2>
          <p>{this.welcomeUser()}</p>
          <div id="authentication">
          {!this.props.currentUser ?
            <button id="signIn" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.signIn}>Sign In</button>
             :
            <button id="signOut" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.signOut}>Sign Out</button>
          }
          </div>
        </div>
      </section>
    );
  }
}
export default AppHeader;
