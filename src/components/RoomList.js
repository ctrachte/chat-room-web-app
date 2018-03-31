import React, { Component } from 'react';
import EditText from './EditText.js';
import UserList  from './UserList.js';


class RoomList extends Component {
  constructor(props) {
    super(props);
        this.state = {
          rooms:[],
          newRoomName:"",
          currentRoomId:"",
          currentRoomName:"",
          showEdit:false,
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
        this.handleNewRoomName = this.handleNewRoomName.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.updateRoomId = this.updateRoomId.bind(this);
        this.openEditWindow = this.openEditWindow.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }
  handleNewRoomName (event) {
    event.preventDefault();
    this.setState({newRoomName:event.target.value});
  }

  handleRoomNameChange(event) {
    event.preventDefault();
    this.setState({currentRoomName: event.target.value});
  }

  createRoom (event) {
    event.preventDefault();
    if (this.props.isAdmin) {
      const newChatRoomName = this.state.newRoomName;
      this.roomsRef.push({name: newChatRoomName });
      this.setState({newRoomName:""});
    } else {
      alert("You must be the admin to add chat rooms");
    }
  }

  deleteRoom (event) {
    event.preventDefault();
    const firstRoom = this.state.rooms[0].name;
    const roomId = event.target.id;
    const roomName = event.target.name;
    const newRoomArray = this.state.rooms.filter(room => room.name !== roomName);
    (roomName===this.state.currentRoomId) ? (this.setState({currentRoomId:firstRoom, rooms: newRoomArray})) : (this.setState({rooms: newRoomArray}));
    this.roomsRef.child(roomId).remove();
  }

  updateRoomId (event) {
    event.preventDefault();
    let newRoomName = this.state.currentRoomName;
    let roomToEdit = event.target.id;
    this.roomsRef.child(roomToEdit).update({name: newRoomName});
    let newRooms = this.state.rooms.map((entry) => {
      if (entry.key === roomToEdit) {entry.name = newRoomName;}
        return entry;
      });
    this.setState({rooms:newRooms, showEdit:false});
  }

  openEditWindow (event) {
    event.preventDefault();
    let roomId = event.target.id;
    let roomName = event.target.name;
    this.setState({currentRoomId: roomId, currentRoomName:roomName, showEdit:true});
  }

  cancelEdit (event) {
    event.preventDefault();
    this.setState({currentRoomId:"", currentRoomName:"", showEdit:false})
  }

  addUser (event) {
    event.preventDefault();
    if (this.state.isAdmin) {
      const newChatRoomName = this.state.newRoomName;
      this.roomsRef.push({name: newChatRoomName });
      this.setState({newRoomName:""});
    } else {
      alert("You must be the admin to add chat rooms");
    }
  }

  render() {
    return (
      <section className="RoomList">
        <aside align="left" className="sidebar">
          <h2>Chat Rooms:</h2>
          {
          this.state.rooms.map( (room, index) =>
            <div key={index} className="roomContainer">
              <h3 id={room.key} onClick={this.props.changeRoom}>{room.name}</h3>
              {this.state.showEdit && this.state.currentRoomId===room.key && this.props.currentUser ?
                <EditText
                  handleMessageChange={this.handleRoomNameChange}
                  updateMessage={this.updateRoomId}
                  currentMessageText={this.state.currentRoomName}
                  openEditWindow={this.openEditWindow}
                  currentMessage={this.state.currentRoomId}
                  cancelEdit={this.cancelEdit}
                />
                : ((!this.state.showEdit && this.props.activeRoom===room.name  && this.props.currentUser && this.props.isSiteAdmin) ?
                  <button id={room.key} name={room.name} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.openEditWindow}>edit room name</button>
                    : null
                  )
              }
              {((this.props.activeRoom===room.name && !this.state.showEdit && this.props.isSiteAdmin) ?
                  <button name={room.name} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id={room.key} onClick={this.deleteRoom}>delete room</button>
                    : null)
              }
              {(!this.state.currentUser && this.props.activeRoom===room.name  && this.props.currentUser && !this.state.showEdit) ?
                <UserList
                  roomKey={room.key}
                  roomName={room.name}
                  firebase={this.props.firebase}
                  currentUser={this.props.currentUser}
                  showEdit={this.state.showEdit}
                  deleteRoom={this.deleteRoom}
                  activeRoom={this.props.activeRoom}
                  isSiteAdmin={this.props.isSiteAdmin}
                />
                : null
              }
            </div>
          )
          }
          {this.props.currentUser  && !this.state.showEdit && this.props.isSiteAdmin ?
            <form onSubmit={this.createRoom}>
              <label>
                New Chat Room:
                <input type="text" name="name" value={this.state.newRoomName} onChange={this.handleNewRoomName}/>
              </label>
                <input type="submit" value="+" className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" />
            </form>
              : <div>You must be an Administrator to edit, delete or add new rooms.</div>
          }
        </aside>
      </section>
    );
  }
}


export default RoomList;
