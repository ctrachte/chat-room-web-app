import React, { Component } from 'react';

class AppHeader extends Component  {
  constructor(props) {
    super(props);
        this.state = {};
        this.usersRef  = this.props.firebase.database().ref('users');
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      this.usersRef.push({name:user.displayName});
    });
  }

  welcomeUser () {
    if (this.props.currentUser) {
      return "Welcome " +  this.props.currentUser.displayName + (this.props.isSiteAdmin ? " (Site Admin)" : "");
    } else {
      return "Please sign in to your google account.";
    }
  }

  render() {
    return (
      <section className="header">
        <div align="center" className="messages">
          <h2>React Chat App <p>by Synthetic Insights </p></h2>
          <h4>{this.welcomeUser()}</h4>
          <div id="authentication">
          {!this.props.currentUser ?
            <button id="signIn" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.props.signIn}>Sign In</button>
             :
            <button id="signOut" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.props.signOut}>Sign Out</button>
          }
          </div>
        </div>
      </section>
    );
  }
}
export default AppHeader;
