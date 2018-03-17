import React, { Component } from 'react';
import './App.css';
import ValidateButton from './ValidateButton';
import ClearButton from './ClearButton';
import ValidatorTextArea from './ValidatorTextArea';

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
  }

  validateJSON = (val) => {
    try {
      if (val.length > 0) {
        JSON.parse(val)
      }
      return {
        valid: true,
        message: ""
      }
    } catch (e) {
      return {
        valid: false,
        message: e.message
      }
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
      [target.name + "Valid"]: this.validateJSON(target.value)
    });
  }

  validate = () => {

    fetch('/validate', {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        schema: this.state.schemaValue,
        json: this.state.jsonValue
      })
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

  clear = () => {
    document.getElementById("validationForm").reset();
    this.setState({
      showValidationMessage: false,
      schemaValueValid: { valid: true, message: "" },
      jsonValueValid: { valid: true, message: "" }
    });
  }

  closeResult = () => {
    this.setState({
      showValidationMessage: false
    });
  }

  render() {
    return (
      <div className="container">

        {this.state.showValidationMessage &&
          <ValidationResultMessage isValid={this.state.isValid}
            validationMessage={this.state.validationMessage}
            closeResult={this.closeResult}
          />
        }
        <form id="validationForm">
          <div className="columns">
            <ValidatorTextArea label="Avro Schema:"
              valid={this.state.schemaValueValid.valid}
              validationMessage={this.state.schemaValueValid.message}
              name="schemaValue"
              handleChange={this.handleChange}
            />
            <ValidatorTextArea label="JSON to Validate:"
              valid={this.state.jsonValueValid.valid}
              validationMessage={this.state.jsonValueValid.message}
              name="jsonValue"
              handleChange={this.handleChange}
            />
          </div>

          <div className="is-pulled-right">
            <ClearButton clear={this.clear} />
            <ValidateButton disabled={(!this.state.schemaValueValid.valid && !this.state.jsonValueValid.valid) || !this.state.schemaValueValid.valid || !this.state.jsonValueValid.valid}
              validate={this.validate}
            />
          </div>
        </form>

      </div>
    );
  }
}

const ValidationResultMessage = ({ isValid, validationMessage, closeResult }) => {
  return (
    <div className={"notification " + (isValid ? "is-primary" : "is-danger")}>
      <button className="delete" onClick={closeResult}></button>
      { validationMessage }
    </div>
  )
};

export default App;
