import React, { Component } from 'react';
import axios from 'axios';

// set as env variable
const CLOUDINARY_URL= 'https://api.cloudinary.com/v1_1/dqik7vajf';
const CLOUDINARY_UPLOAD_PRESET= 'zy2frnkx';

class ProfileChange extends Component {
  state = { name: '',
            description: '',
            img: '' }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleImgUpload = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: formData
    })
      .then(res => console.log('Cloudinary post request succeeded with ', res))
      .catch(error => console.log('Cloudinary post request failed with ', error));

  }

  handleFormSubmit = e => {
    e.preventDefault();

    const data = { name: this.state.name, description: this.state.description };

    fetch('/api/users', {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(data => data.json())
    .then(user => {
      console.log('Request succeeded with JSON response', user);
    })
    .catch(error => {
      console.log('Request failed', error);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} >
          Name: <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
          Description: <input name="description" type="text" value={this.state.description} onChange={this.handleChange}/>
          Profile Picture: <input type="file" accept=".jpg, .jpeg, .png" onChange={this.handleImgUpload} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default ProfileChange;
