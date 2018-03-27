import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
        this.state = {
          rooms:[],
          newRoomName:"",
          currentRoom:""
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleNameChange = this.handleNameChange.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleNameChange(event) {
    event.preventDefault();
    this.setState({newRoomName: event.target.value});
  }

  createRoom (event) {
    event.preventDefault();
    if (this.props.currentUser) {
      const newChatRoomName = this.state.newRoomName;
      this.roomsRef.push({name: newChatRoomName });
      this.setState({newRoomName:""});
    } else {
      alert("You must be signed in to add chat rooms");
    }
  }

  deleteRoom (event) {
    event.preventDefault();
    const firstRoom = this.state.rooms[0].name;
    const roomId = event.target.id;
    const roomName = event.target.name;
    const newRoomArray = this.state.rooms.filter(room => room.name !== roomName);
    (roomName===this.state.currentRoom) ? (this.setState({currentRoom:firstRoom, rooms: newRoomArray})) : (this.setState({rooms: newRoomArray}));
    this.roomsRef.child(roomId).remove();
  }

  render() {
    return (
      <section className="RoomList">
        <aside align="left" className="sidebar">
          <h2>Chat Rooms:</h2>
          {
          this.state.rooms.map( (room, index) =>
            <div key={index} className="roomContainer">
              <h3 id={room.name} onClick={this.props.changeRoom}>{room.name}</h3>
              {this.props.currentUser ?
                <button name={room.name} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id={room.key} onClick={this.deleteRoom}>Delete</button>
                : null
              }
            </div>
          )
          }
          {this.props.currentUser ?
          <form onSubmit={this.createRoom}>
            <label>
              New Chat Room:
              <input type="text" name="name" value={this.state.newRoomName} onChange={this.handleNameChange}/>
            </label>
            <input type="submit" value="+" className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" />
          </form>
            : null
          }
        </aside>
      </section>
    );
  }
}


export default RoomList;
