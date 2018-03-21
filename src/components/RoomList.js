import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
        this.state = {
          rooms:[]
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      console.log(snapshot);
    });
  }

  render() {
    return (
      <section className="RoomList">
        <aside align="left" className="sidebar">
          <h2>Bloc Chat</h2>
          <h3>Room 1</h3>
          <h3>Room 2</h3>
          <h3>Room 3</h3>
        </aside>
      </section>
    );
  }
}


export default RoomList;
