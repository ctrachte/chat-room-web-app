import React, { Component } from 'react';

class EditText extends Component  {
  constructor(props) {
    super(props);
        this.state = {
          currentMessageText:""
        };
  }

  render() {
    return (
        <div id="edit-window">
          <form id={this.props.currentMessage} onSubmit={this.props.updateMessage}>
            <label>
              <textarea type="text" name="editMessageText" value={this.props.currentMessageText} onChange={this.props.handleMessageChange}/>
            </label>
            <div>
              <input type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" value="Submit Changes" />
              <button id="cancel-button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.props.cancelEdit}>X</button>
            </div>
          </form>

        </div>
    );
  }
}
export default EditText;
