import React from 'react';

export default ({profile}) => {
  return (
    <div>
      <p>Name: {profile.name}</p>
      <p>Description: {profile.description}</p>
    </div>
  )
}
