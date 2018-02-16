import React from "react";
import { render } from "react-dom";
import styles from './index.css';
// import axios, { post } from 'axios';  //TODO: Use Fetch https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

function checkZipCode(field2validate) {
  const constraints = {
    ch: ['^(CH-)?\\d{4}$', "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950"],
    fr: ['^(F-)?\\d{5}$', "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012"],
    de: ['^(D-)?\\d{5}$', "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345"],
    nl: ['^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
      "Nederland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS"]
  };

  const country = 'fr';
  const constraint = new RegExp(constraints[country][0], "");
  if (constraint.test(field2validate.value)) {
    field2validate.setCustomValidity("");
  }
  else {
    field2validate.setCustomValidity(constraints[country][1]);
  }
}

function checkFileSize(field2validate) {
  const files = field2validate.files;

  if (files.length > 0) {
    if (files[0].size > 75 * 1024) { // Check the constraint
      field2validate.setCustomValidity("The selected file must not be larger than 75 kB");
      return;
    }
  }
  field2validate.setCustomValidity("");
}

function fileUpload(file) { //TODO: Use Fetch https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const url = 'http://example.com/file-upload';
  const formData = new FormData();
  formData.append('file', file)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return post(url, formData, config)
}

const Label = ({ htmlFor, title }) => {
  return (
    <label htmlFor={htmlFor}>{title}</label>
  )
};

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      subject: '',
      zipcode: '',
      file: null,
      message: ''
    }
  }

  handleInput = (event) => {
    //var country = document.getElementById("Country").value;
    let field2validate = event.target;

    if (field2validate.id === 'formZipCode') {
      checkZipCode(field2validate);
    }

    if (field2validate.id === 'formFile') {
      let newState = {};
      newState[event.target.name] = field2validate.files[0];
      this.setState(newState);

      checkFileSize(field2validate);
    }
  };

  handleChange = (e) => {
    let newState = {};

    newState[e.target.name] = e.target.value;

    this.setState(newState);
  };

  handleSubmit = (e, message) => {
    e.preventDefault();

    let formData = {
      formSender: this.state.name,
      formEmail: this.state.email,
      formSubject: this.state.subject,
      formMessage: this.state.message
    }

    if (formData.formSender.length < 1 || formData.formEmail.length < 1 || formData.formSubject.length < 1 || formData.formMessage.length < 1) {
      return false;
    }

    //TODO: Look into making calls leveraging xcc apis
    //      Add a server endpoint to receive all POSTs and do something with it. i.e store in MongoDB or in Connections.
    //TODO: Use Fetch https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    // $.ajax({
    //   url: 'https://a3b1075e.ngrok.io/formreact/',
    //   dataType: 'json',
    //   type: 'POST',
    //   data: formData,
    //   success: function (data) {
    //     if (confirm('Thank you for your message. Can I erase the form?')) {
    //       document.querySelector('.form-input').val('');
    //     }
    //   },
    //   error: function (xhr, status, err) {
    //     console.error(status, err.toString());
    //     alert('There was some problem with sending your message.');
    //   }
    // });

    // fileUpload(this.state.file).then((response)=>{
    //   console.log(response.data);
    // })

    this.setState({
      name: '',
      email: '',
      subject: '',
      zipcode: '',
      file: null,
      message: ''
    });
  };

  render() {
    return (
      <form className='react-form' onSubmit={this.handleSubmit}>
        <fieldset className='form-group'>
          <legend>Post a congratulatory note</legend>

          <Label htmlFor='formName' title='Full Name:' />
          <input
            id='formName'
            className='form-input'
            name='name'
            type='text'
            ref='formName'
            required
            onChange={this.handleChange}
            value={this.state.name}
            placeholder='enter your name'
          />

          <Label htmlFor='formEmail' title='Email Address:' />
          <input id='formEmail' className='form-input' name='email' type='email' required onChange={this.handleChange} value={this.state.email} />

          <Label htmlFor='formSubject' title='Subject:' />
          <input id='formSubject' className='form-input' name='subject' type='text' required onChange={this.handleChange} value={this.state.subject} />

          <Label htmlFor='formZipCode' title='Zip Code:' />
          <input
            id='formZipCode'
            className='form-input'
            name='zipcode'
            type='text'
            required
            onChange={this.handleChange}
            value={this.state.zipcode}
            onInvalid={this.handleInvalid}
            onInput={this.handleInput}
          />

          <Label htmlFor='formFile' title='Attachment:' />
          <input
            id="formFile"
            type="file"
            onChange={this.handleInput}
          />

          <Label htmlFor='formMessage' title='Message:' />
          <textarea id='formMessage' className='form-textarea' name='message' required onChange={this.handleChange} value={this.state.message}></textarea>
        </fieldset>

        <div className='form-group'>
          <input id='formButton' className='btn' type='submit' placeholder='Send message' />
        </div>
      </form>
    )
  }
};

export default Form;
