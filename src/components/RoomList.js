import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
        this.state = {
          rooms:[]
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  render() {
    return (

      <section className="room-list">
      </section>

    );
  }
}

export default RoomList;
