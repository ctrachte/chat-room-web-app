import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.state = {
          rooms:[]
        };
  }

  render() {
    return (

      <section className="room-list">
      </section>

    );
  }
}

export default RoomList;
