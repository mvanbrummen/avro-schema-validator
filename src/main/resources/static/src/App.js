import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      schemaValue: null,
      jsonValue: null,
      showValidationMessage: false,
      validationMessage: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  validate() {

    let req = JSON.stringify({
      schema: this.state.schemaValue,
      json: this.state.jsonValue
    });
  
    fetch('http://localhost:8080/validate', {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: req
    })
    .then(res => res.json())
    .then(data => {
         this.setState({
            showValidationMessage: true,
            validationMessage: data.valid ? "JSON validated against Avro Schema" : "Invalid: " + data.message
        });
    })
    .catch(e => {
        console.log('Error:' + e);
    })
  }

  clear() {
    document.getElementById("validationForm").reset();
    this.setState({
       showValidationMessage: false
   });
  }

  render() {
    return (
      <div className="container">
        <form id="validationForm">
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">
                Avro Schema:
              </label>
              <div className="control">
              <textarea
                  className="textarea"
                  name="schemaValue"
                  rows="20"
                  onChange={this.handleChange}>
                </textarea>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">
                  JSON To Validate:
                </label>
                <div className="control">
                <textarea
                    className="textarea"
                    name="jsonValue"
                    rows="20"
                     onChange={this.handleChange}>
                </textarea>
                </div>
              </div>
            </div>
          </div>
          { this.state.showValidationMessage &&
            <h3>{ this.state.validationMessage }</h3>
          }

          <div className="is-pulled-right">
            <input className="button is-white" type="button" value="Clear" onClick={this.clear.bind(this)}/>
            <input className="button is-primary" type="button" value="Validate" onClick={this.validate.bind(this)}/>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
