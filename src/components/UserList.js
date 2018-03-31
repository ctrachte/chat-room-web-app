import React, { Component } from 'react';

class UserList extends Component  {
  constructor(props) {
    super(props);
        this.state = {
          users:[],
          newUserName:"",
          showEdit:false,
          currentUser: this.props.currentUser,
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

  renderUsers (user, index, currentRoomName) {
    let userName = user.name;
    let userArray = this.state.users[index];
    let adminRooms = [userArray.adminRooms];
    let roomPermission = [userArray.roomPermission];
    let isAdmin = adminRooms.map((room) => ((room.room===currentRoomName || room.room==="all") ? true : false));
    let isUser = roomPermission.map((room) => ((room.room===currentRoomName || room.room==="all") ? true : false));
    if (isUser) {
      if (isAdmin) {

          return <li key={index} id={userArray.key}>{userName} (Admin)</li>

        } else {
          return <li key={index} id={userArray.key}>{userName}</li>;
        }
      } else {
        return null;
      }
  }

  render() {
    return (
      <div id="users-window">
        <ul id="users-list">
          <h4>Users:</h4>
          {
            this.state.users.map( (user, index) => {
                return this.renderUsers( user, index, this.props.roomName);
            }
          )
          }
        </ul>
      </div>
    );
  }
}
export default UserList;
