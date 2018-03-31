import React, { Component } from 'react';
import EditText from "./EditText.js"

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
        <span id="delete-room-button">
          {((this.props.activeRoom===this.props.roomName && !this.props.showEdit && this.props.isSiteAdmin) ?
              <button name={this.props.roomName} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id={this.props.roomKey} onClick={this.props.deleteRoom}>delete room</button>
                : <p>You must be an admin for this room to delete or rename it.</p>)
          }
        </span>
        <span id="edit-room-button">
          {this.state.showEdit && this.state.currentRoomId=== this.props.roomName && this.props.currentUser ?
            <EditText
              handleMessageChange={this.props.handleMessage}
              updateMessage={this.props.updateMessage}
              currentMessageText={this.props.currentMessageText}
              openEditWindow={this.props.openEditWindow}
              currentMessage={this.props.curentMessage}
              cancelEdit={this.props.cancelEdit}
            />
            : ((!this.props.showEdit && this.props.activeRoom===this.props.roomName  && this.props.isSiteAdmin) ?
              <button id={this.props.roomKey} name={this.props.roomName} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.props.openEditWindow}>edit room name</button>
                : null)
          }
        </span>
      </div>
    );
  }
}
export default UserList;
