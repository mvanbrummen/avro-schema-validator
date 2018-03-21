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
        JSON.parse(val);
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
      <div>
        <NavBar />

        <section>
          <Opening />
        </section>

        <section className="section panels">

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
        </section>

        <Footer />
      </div>
    );
  }
}

const ValidationResultMessage = ({ isValid, validationMessage, closeResult }) => {
  return (
    <div className={"notification " + (isValid ? "is-primary" : "is-danger")}>
      <button className="delete" onClick={closeResult}></button>
      {validationMessage}
    </div>
  )
};

const NavBar = () => {
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <h1 class="title"><span class="logo">{'{'}{'}'} </span>Avro Schema Validator</h1>
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-primary" href="https://github.com/mvanbrummen/avro-schema-validator">
                <span class="icon">
                  <i class="fab fa-github"></i>
                </span>
                <span>View on GitHub</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}

const Opening = () => {
  return (
    <div class="container opening">
      <p>
        A quick and simple tool to validate a JSON message against an <a href="https://avro.apache.org/docs/1.8.1/spec.html">Avro schema</a>.
      </p>
    </div>
  )
}

const Footer = () => {
  return (
    <footer class="has-text-centered is-marginless is-padless">
      <p class="is-size-7">Built with Scala, Akka HTTP, ReactJS and Bulma CSS</p>
    </footer>
  )
}

export default App;
