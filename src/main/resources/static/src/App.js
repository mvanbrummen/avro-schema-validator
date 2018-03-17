import React, { Component } from 'react';
import './App.css';
import ValidateButton from './ValidateButton';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      schemaValue: null,
      jsonValue: null,
      schemaValueValid: { valid: true, message: "" },
      jsonValueValid: { valid: true, message: "" },
      showValidationMessage: false,
      isValid: false,
      validationMessage: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }
  
  validateJSON(val) {
    try {
      if (val.length > 0) {
        JSON.parse(val)
      }
      return { 
        valid: true,
        message: ""
      }
    } catch(e) {
      return { 
        valid: false,
        message: e.message
      }
    }  
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
      [target.name + "Valid"]: this.validateJSON(target.value)
    });
  }

  validate() {

    let req = JSON.stringify({
      schema: this.state.schemaValue,
      json: this.state.jsonValue
    });
  
    fetch('/validate', {
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
            isValid: data.valid,
            validationMessage: data.valid ? "JSON is valid against Avro Schema" : "Invalid: " + data.message
        });
    })
    .catch(e => {
        console.log('Error:' + e);
    })
  }

  clear() {
    document.getElementById("validationForm").reset();
    this.setState({
       showValidationMessage: false,
       schemaValueValid: { valid: true, message: "" },
       jsonValueValid: { valid: true, message: "" }
   });
  }

  closeResult() {
      this.setState({
         showValidationMessage: false
     });
  }

  render() {
    return (
      <div className="container">
      
      { this.state.showValidationMessage &&
        <div className={"notification " + (this.state.isValid ? "is-primary" : "is-danger" ) }>
          <button className="delete" onClick={this.closeResult.bind(this)}></button>
          { this.state.validationMessage }
        </div>
      }
        <form id="validationForm">
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">
                Avro Schema: 
                
                { !this.state.schemaValueValid.valid &&
                 <span class="tag is-danger is-pulled-right">Invalid JSON: {this.state.schemaValueValid.message} </span>
                }
                
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
                  
                  { !this.state.jsonValueValid.valid &&
                   <span class="tag is-danger is-pulled-right">Invalid JSON: {this.state.jsonValueValid.message}</span>
                  }
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

          <div className="is-pulled-right">
            <input className="button is-white" 
              type="button" 
              value="Clear" 
              onClick={this.clear.bind(this)}/>
              <ValidateButton disabled={(!this.state.schemaValueValid.valid && !this.state.jsonValueValid.valid) || !this.state.schemaValueValid.valid || !this.state.jsonValueValid.valid}
                      validate={this.validate.bind(this)}
              />
          </div>
        </form>

      </div>
    );
  }
}

export default App;
