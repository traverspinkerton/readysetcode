import React, { Component } from 'react';
import ProfileList from './ProfileList';
import ProfileChange from './ProfileChange';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProfileList />
        <ProfileChange />
      </div>
    );
  }
}

export default App;
