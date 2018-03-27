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
              <textarea type="text" name="name" value='' onChange="{}"/>
            </label>
            <input type="submit" value="Publish Changes" className="mdl-button mdl-js-button mdl-button mdl-button--colored" onClick="{}"/>
          </form>
        </div>
    );
  }
}
export default EditText;
