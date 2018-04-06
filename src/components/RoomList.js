import React, { Component } from 'react';
import EditText from './EditText.js';

class RoomList extends Component {
  constructor(props) {
    super(props);
        this.state = {
          rooms:[],
          newRoomName:"",
          currentRoomId:"",
          currentRoomName:"",
          showEdit:false,
          newAdminName:"",
          isPrivate:false,
          showAddAdmin:false,
          currentRoomAdmins:[],
          isRoomAdmin:false
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
        this.handleNewRoomName = this.handleNewRoomName.bind(this);
        this.handleNewAdminName = this.handleNewAdminName.bind(this);
        this.addRoomAdmin = this.addRoomAdmin.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.updateRoomId = this.updateRoomId.bind(this);
        this.openEditWindow = this.openEditWindow.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.makePrivate = this.makePrivate.bind(this);
        this.handleRoomClick = this.handleRoomClick.bind(this);
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

  handleNewAdminName (event) {
    event.preventDefault();
    this.setState({newAdminName:event.target.value});
  }


  handleRoomNameChange(event) {
    event.preventDefault();
    this.setState({currentRoomName: event.target.value});
  }

  createRoom (event) {
    event.preventDefault();
    let newChatRoomName = this.state.newRoomName;
    let name = this.props.currentUser.displayName;
    this.roomsRef.push({name: newChatRoomName, isPrivate:this.state.isPrivate, admins:{name}});
    this.setState({newRoomName:""});
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

  addRoomAdmin (event) {
    event.preventDefault();
    let newAdminName = this.state.newAdminName;
    let roomToEdit = event.target.id;
    let roomAdmins = this.state.currentRoomAdmins;
    if (!(roomAdmins.includes(newAdminName))) {
      this.roomsRef.child(roomToEdit).child("admins").push(newAdminName);
      roomAdmins.push(newAdminName);
      let newRooms = this.state.rooms.map((entry) => {
        if (entry.key === roomToEdit) {
          entry.admins.name = newAdminName;
        }
          return entry;
        });
      console.log(newRooms);
      this.setState({rooms:newRooms, showEdit:false, newAdminName:"", currentRoomAdmins:roomAdmins});
    } else {
      alert('This user is already an admin');
    }
  }

  makePrivate (event) {
    if (event.target.checked) {
      this.setState({isPrivate:true});
    } else {
      this.setState({isPrivate:false});
    }
  }

  addAddAdminButton (event) {
    event.preventDefault();
    if (!this.state.showAddAdmin) {
      this.setState({showAddAdmin:true});
    } else {
      this.setState({showAddAdmin:false});
    }
  }

  handleRoomClick (event) {
    this.props.changeRoom(event);
    if (this.props.currentUser) {
      let currentUser = this.props.currentUser.displayName;
      let currentRoom = this.state.rooms.filter(room => room.name===event.target.innerHTML);
      let roomAdmins = Object.values(currentRoom[0]['admins']);
      let privacy = currentRoom[0]['isPrivate'];
      this.setState({currentRoomAdmins:roomAdmins});
      this.props.setRoomPriv(currentUser, privacy, roomAdmins);
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

              <h3 id={room.key} onClick={this.handleRoomClick}>{room.name}</h3>

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
              <ul>
                {this.props.currentUser  && this.props.activeRoom===room.name && ((this.props.isActiveRoomAdmin && this.props.isRoomPrivate) || !this.props.isRoomPrivate) ?
                  <h4>Room Admins:</h4>
                  : null
                }
                { this.props.currentUser  && this.props.activeRoom===room.name && ((this.props.isActiveRoomAdmin && this.props.isRoomPrivate) || !this.props.isRoomPrivate) ?
                    (this.state.currentRoomAdmins.map((admin, index) => {
                      return <li key={index}>{admin}</li>
                    })) : null
                }
              </ul>
              {this.props.currentUser  && !this.state.showEdit && this.props.isRoomAdmin && this.props.activeRoom===room.name ?
                <form onSubmit={this.addRoomAdmin} id={room.key} name={room.name}>
                  <label>
                    New Admin:
                    <input type="text" name="name" value={this.state.newAdminName} onChange={this.handleNewAdminName}/>
                  </label>
                    <input type="submit" id={room.name} value="+" className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" />
                </form>
                  : null
                }
            </div>

          )
          }
          {this.props.currentUser  && !this.state.showEdit && this.props.isSiteAdmin ?
            <form onSubmit={this.createRoom}>
              <h4>Add New room</h4>
              <div>
                <label>
                  Name:
                  <input type="text" name="name" value={this.state.newRoomName} onChange={this.handleNewRoomName}/>
                </label>
                  <input type="submit" value="+" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" />
              </div>
              <div>
                <label>
                  Make this room private:
                  <input type="checkbox" onChange={this.makePrivate} id={this.state.newRoomName}/>
                </label>
              </div>
            </form>
              : <div>You must be an Administrator to edit, delete or add new rooms.</div>
          }
        </aside>
      </section>
    );
  }
}


export default RoomList;
