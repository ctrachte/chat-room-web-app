import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
        this.state = {
          rooms:[],
          newRoomName:"Enter New Room Name"
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleNameChange = this.handleNameChange.bind(this);
        this.createRoom = this.createRoom.bind(this);
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
    console.log(event.target.value);
  }

  createRoom (event) {
    event.preventDefault();
    const newChatRoomName = this.state.newRoomName;
    this.roomsRef.push({name: newChatRoomName });
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
            <div key={index} className="room" id={room.name} >
              <h3 onClick={this.props.changeRoom}>{room.name}</h3>
              <button>Delete</button>
            </div>
          )
          }
        </aside>
      </section>
    );
  }
}


export default RoomList;
