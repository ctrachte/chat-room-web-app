import React, { Component } from 'react';

class ActiveRoom extends Component  {
  constructor(props) {
    super(props);
        this.state = {
          conversations:[]
        };
        this.activeRoomId = this.props.activeRoomId;
  }

  render() {
    return (
      <section className="MessageList">
        <div align="center" className="messages">
          <h2>Active Room: {this.activeRoomId} </h2>
        </div>
      </section>
    );
  }
}
export default ActiveRoom;
