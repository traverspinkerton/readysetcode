import React, { Component } from 'react';
import Profile from './Profile';

class ProfileList extends Component {
  state = { profiles: [] }

  componentDidMount() {
    this.getProfiles();
    console.log(this.state.profiles);
  }

  getProfiles = () => {
    // grab profiles from api and store them in our componentstate
    fetch('/api/users')
    .then(res => res.json())
    .then(profiles => {console.log(profiles); this.setState({ profiles })});
  }

  render() {
    return (
      <div>
        <ul>
        {this.state.profiles.map(profile => (
          <Profile key={Math.random().toString()} profile={profile} />
        ))}
        </ul>
      </div>
    )
  }

}

export default ProfileList;
