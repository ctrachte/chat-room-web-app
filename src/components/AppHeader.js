import React, { Component } from 'react';

class AppHeader extends Component  {
  constructor(props) {
    super(props);
        this.state = {
          conversations:[]
        };
        this.activeRoomId = this.props.activeRoomId;
  }

  render() {
    return (
      <section className="header">
        <div align="center" className="messages">
          <h2>React Chat App</h2>
        </div>
      </section>
    );
  }
}
export default AppHeader;
