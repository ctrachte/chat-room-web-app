import React, { Component } from 'react';

class UserList extends Component  {
  constructor(props) {
    super(props);
        this.state = {
          users:[]
        };
        this.usersRef = this.props.firebase.database().ref('users');
  }

  componentDidMount() {
    this.usersRef.on('child_added', snapshot => {
      const user = snapshot.val();
      user.key = snapshot.key;
      this.setState({ users: this.state.users.concat( user ) });
    });
  }

  render() {
    return (
      <ul id="users-window">
        <h4>Users:</h4>
        {this.state.users.map( (user, index) =>
          <li key={index} id={user.key}>{user.name}</li>

        )
        }
      </ul>
    );
  }
}
export default UserList;
