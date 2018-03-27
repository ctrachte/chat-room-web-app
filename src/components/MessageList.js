import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
        this.state = {
          messages:[],
          newMessage:""
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleMessageSend = this.handleMessageSend.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
    }

    handleMessageSend(event) {
      this.setState({newMessage: event.target.value});
    }

    sendMessage (event) {
      event.preventDefault();
      if (this.props.currentUser) {
        const messageInput = this.state.newMessage;
        const messageTime = this.props.timeChange();
        this.messagesRef.push({
          content:messageInput,
          roomId:this.props.activeRoom,
          sentAt:messageTime,
          username: this.props.currentUser.displayName
        });
      } else {
        alert("You must be signed in to send messages");
      }
      this.setState({newMessage:""});
    }
    deleteMessage (event) {
      event.preventDefault();
      const messageId = event.target.id;
      const newMessageArray = this.state.messages.filter(message => message.key !== messageId);
      this.setState({messages: newMessageArray});
      this.messagesRef.child(messageId).remove();
    }

  render() {
    return (
      <section className="MessageList">
        <div align="center" className="messages">
          <h2>{this.props.activeRoom} Messages:</h2>
          {
          this.state.messages.filter(message => message.roomId===this.props.activeRoom).map( (message, index) =>
              <div key={index} className="message">
                <h3>{message.username}: </h3>
                <p>{message.content}</p>
                <p>Sent: {message.sentAt}</p>
                {(this.props.currentUser.displayName===message.username) ? <button id={message.key} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.deleteMessage}>Delete</button> : null}
              </div>
          )
          }
        </div>
        <form id="addMessageContainer" onSubmit={this.sendMessage}>
          <label>
            <h3>Send a message:</h3>
            <textarea type="text" name="newMessage" value={this.state.newMessage} onChange={this.handleMessageSend}/>
          </label>
          <div>
            <input type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" value="Submit" />
          </div>
        </form>
      </section>
    );
  }
}


export default MessageList;
