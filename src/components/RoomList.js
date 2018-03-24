import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
        this.state = {
          rooms:[],
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
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


  createRoom (event) {
    event.preventDefault();
    const newChatRoomName = this.state.newRoomName;
    this.roomsRef.push({name: newChatRoomName });
  }

  deleteRoom (event) {
    event.preventDefault();
    const roomToDelete = event.target.parentNode.firstChild.id;
    this.roomsRef.child(roomToDelete).remove();
  }

  render() {
    return (
      <section className="RoomList">
        <aside align="left" className="sidebar">
          <h2>Chat Rooms</h2>
          <form onSubmit={this.createRoom}>
            <label>
              New Chat Room:
              <input type="text" name="name"/>
            </label>
            <input type="submit" value="Submit" />
          </form>
          {
          this.state.rooms.map( (room, index) =>
            <div key={index} className="roomContainer" onClick={this.props.changeRoom}>
              <h3 id={room.name}>{room.name}</h3>
              <button onClick={this.deleteRoom}>Delete</button>
            </div>
          )
          }
        </aside>
      </section>
    );
  }
}


export default RoomList;
