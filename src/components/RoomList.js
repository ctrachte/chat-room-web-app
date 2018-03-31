import React, { Component } from 'react';
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
                {((!this.state.currentUser && this.props.activeRoom===room.name  && this.props.currentUser && !this.state.showEdit) ?
                  <UserList
                    roomKey={room.key}
                    roomName={room.name}
                    firebase={this.props.firebase}
                    currentUser={this.props.currentUser}
                    showEdit={this.state.showEdit}
                    deleteRoom={this.deleteRoom}
                    activeRoom={this.props.activeRoom}
                    isSiteAdmin={this.props.isAdmin}
                    handleMessageChange={this.handleRoomNameChange}
                    updateMessage={this.updateRoomId}
                    currentMessageText={this.state.currentRoomName}
                    openEditWindow={this.openEditWindow}
                    currentMessage={this.state.currentRoomId}
                    cancelEdit={this.cancelEdit}
                  />
                  : null)
                }
            </div>
          )
          }
          {this.props.currentUser  && !this.state.showEdit && this.props.isAdmin ?
            <form onSubmit={this.createRoom}>
              <label>
                New Chat Room:
                <input type="text" name="name" value={this.state.newRoomName} onChange={this.handleNewRoomName}/>
              </label>
                <input type="submit" value="+" className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" />
            </form>
              : <div>You must be the Site Administrator to add new rooms.</div>
          }
        </aside>
      </section>
    );
  }
}


export default RoomList;
