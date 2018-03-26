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
    const roomToDelete = event.target.id;
    this.roomsRef.child(roomToDelete).remove();
    // this.state.rooms.filter(room => room.key!==event.target.id);
  }

  render() {
    return (
      <section className="RoomList">
        <aside align="left" className="sidebar">
          <h2>Chat Rooms</h2>
          <form onSubmit={this.createRoom}>
            <label>
              New Chat Room:
              <input type="text" name="name" value={this.state.newRoomName} onChange={this.handleNameChange}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
          {
          this.state.rooms.map( (room, index) =>
            <div key={index} className="roomContainer">
              <h3 id={room.name} onClick={this.props.changeRoom}>{room.name}</h3>
              <button id={room.key} onClick={this.deleteRoom}>Delete</button>
            </div>
          )
          }
        </aside>
      </section>
    );
  }
}


export default RoomList;
