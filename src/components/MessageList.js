import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
        this.state = {
          messages:[]
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
    }

  render() {
    return (
      <section className="MessageList">
        <div align="center" className="messages">
          <h2>Messages:</h2>
          {
          this.state.messages.filter(message => message.roomId===this.props.activeRoom).map( (message, index) =>
              <div key={index} className="message">
                <h3>{message.username}: </h3>
                <p>{message.content}</p>
                <p>Sent: {message.sentAt}</p>
              </div>
          )
          }
        </div>
      </section>
    );
  }
}


export default MessageList;
