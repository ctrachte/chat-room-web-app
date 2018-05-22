import React, { Component } from 'react';
import EditText from './EditText.js';
import UserList from './UserList.js';


class MessageList extends Component {
  constructor(props) {
    super(props);
        this.state = {
          messages:[],
          newMessage:"",
          currentMessage:"",
          currentMessageText:"",
          editedTime:"",
          showEdit:false,
          users:[],
          onlineUsers:[]
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.usersRef = this.props.firebase.database().ref('users');
        this.handleMessageSend = this.handleMessageSend.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.openEditWindow = this.openEditWindow.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
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
      const messageInput = this.state.newMessage;
      const messageTime = "Sent on: " + this.props.timeChange();
      this.messagesRef.push({
        content:messageInput,
        roomId:this.props.activeRoom,
        sentAt:messageTime,
        username: this.props.currentUser.displayName
      });
      this.setState({newMessage:""});
    }

    deleteMessage (event) {
      event.preventDefault();
      const messageId = event.target.id;
      const newMessageArray = this.state.messages.filter(message => message.key !== messageId);
      this.setState({messages: newMessageArray});
      this.messagesRef.child(messageId).remove();
    }

    handleMessageChange(event) {
      this.setState({currentMessageText: event.target.value});
    }

    updateMessage (event) {
      event.preventDefault();
      let time = "Last Edited on: " + String(this.props.timeChange());
      const messageEdit = this.state.currentMessageText;
      const messageToEdit = event.target.id;
      this.messagesRef.child(messageToEdit).update({content: messageEdit, sentAt:time});
      let newMessages = this.state.messages.map((entry) => {
        if (entry.key === messageToEdit) {entry.content = messageEdit;}
          return entry;
        });
      this.setState({showEdit:false, editedTime:time, messages:newMessages});
    }

    openEditWindow (event) {
      event.preventDefault();
      let messageId = event.target.id;
      let messageName = event.target.name;
      this.setState({currentMessage: messageId, currentMessageText:messageName, showEdit:true});
    }

    cancelEdit (event) {
      event.preventDefault();
      this.setState({currentMessage:"", currentMessageText:"", editedTime:"", showEdit:false})
    }

  render() {
    return (
      <section className="MessageList">
        <div className="messages">
        {this.props.isActiveRoomAdmin || !this.props.isRoomPrivate ?
          <h3>{this.props.activeRoom} Messages:</h3>
          : <p>This room is private. You must be an admin to view and send messages here. Request to be added to this conversation by an admin.</p>
        }
          <div id="user-list">
            {this.props.isActiveRoomAdmin || !this.props.isRoomPrivate ?
            <p>People in This Conversation:</p> : null
            }

          {this.props.isActiveRoomAdmin || !this.props.isRoomPrivate ?
            <UserList
              activeRoom={this.props.activeRoom}
              messages={this.state.messages}
            /> : null
          }
          </div>
          {this.props.isActiveRoomAdmin || !this.props.isRoomPrivate ?
          this.state.messages.filter(message => message.roomId===this.props.activeRoom).map( (message, index) =>
              <div key={index} id={message.content}>
                <h3>{message.username}: </h3>
                <p>{message.content}</p>
                <p>{(this.state.editedTime && this.props.activeRoom===message.roomId && this.state.currentMessage===message.key) ? this.state.editedTime : message.sentAt}</p>
                {(this.props.currentUser.displayName===message.username && !this.state.showEdit) ?
                  <button id={message.key} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.deleteMessage}>Delete</button>
                  : null
                }
                {this.state.showEdit && this.state.currentMessage===message.key ?
                  <EditText
                    handleMessageChange={this.handleMessageChange}
                    updateMessage={this.updateMessage}
                    currentMessageText={this.state.currentMessageText}
                    openEditWindow={this.openEditWindow}
                    currentMessage={this.state.currentMessage}
                    cancelEdit={this.cancelEdit}
                  />
                  : ((this.props.currentUser.displayName===message.username && !this.state.showEdit) ?
                    <button id={message.key} name={message.content} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.openEditWindow}>Edit</button>
                      : null
                    )
                }
              </div>

          ) : null
          }
        </div>
        {!this.state.showEdit && (this.props.isActiveRoomAdmin || ! this.props.isRoomPrivate) ?
        <form id="addMessageContainer" onSubmit={this.sendMessage}>
          <label>
            <h4>Send a message:</h4>
            <textarea type="text" name="newMessage" value={this.state.newMessage} onChange={this.handleMessageSend}/>
          </label>
          <div>
            <input type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" value="Submit" />
          </div>
        </form>
          : null
        }

      </section>
    );
  }
}


export default MessageList;
