import React, { Component } from 'react';

class EditText extends Component  {
  constructor(props) {
    super(props);
        this.state = {
        };
  }

  render() {
    return (
        <div id="edit-window">
          <form>
            <label>
              Edit Message:
              <textarea type="text" name="name" value={this.props.currentMessage} onChange={this.props.handleMessageChange} />
            </label>
            <input type="submit" value="Publish Changes" className="mdl-button mdl-js-button mdl-button mdl-button--colored" onClick={this.props.toggleEditWindow}/>
          </form>
        </div>
    );
  }
}
export default EditText;
