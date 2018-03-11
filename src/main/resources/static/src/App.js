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

  console.log(req);

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
            validationMessage: data.valid ? "JSON validated against Avro Schema" ? "Invalid: " + data.message
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
      <div>

      <form id="validationForm">
        <textarea
            placeholder="Enter an Avro schema..."
            name="schemaValue"
            onChange={this.handleChange}
        ></textarea>
        <textarea
            placeholder="Enter some JSON..."
            name="jsonValue"
             onChange={this.handleChange}
            >
        </textarea>

        { this.state.showValidationMessage &&
          <h3>{ this.state.validationMessage }</h3>
        }

        <input type="button" value="Clear" onClick={this.clear.bind(this)}/>
        <input className="validate-submit-btn" type="button" value="Validate" onClick={this.validate.bind(this)}/>

</form>
      </div>
    );
  }
}

export default App;
