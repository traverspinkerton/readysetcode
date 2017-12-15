import React, { Component } from 'react';

class ProfileChange extends Component {
  state = { name: '',
            description: '',
            img: '' }

  handleChange = e => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
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
          Profile Picture: <input type="file" accept=".jpg, .jpeg, .png"/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default ProfileChange;
