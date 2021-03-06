import React, { Component } from 'react';

class UserList extends Component {
  constructor(props) {
    super(props);
        this.state = {
        };

  }
  renderUsers () {
    let users = this.props.messages.filter(message => message.roomId===this.props.activeRoom).map((message) => message.username);
    let unique_users = users.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });
    let userContainer = unique_users.map((user, index) =>
      <p key={index}>{user}</p>
    );
    return userContainer;
  }

  render() {
    return (
      <section className="MessageList">
        {
          this.renderUsers()
        }
      </section>
    );
  }
}


export default UserList;
