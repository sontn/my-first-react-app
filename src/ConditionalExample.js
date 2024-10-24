import React from 'react';

function ConditionalExample({ isLoggedIn, user }) {
  return (
    <div>
      <h1>Welcome to our app!</h1>
      {isLoggedIn ? (
        <div>
          <p>You are logged in. Here's your dashboard.</p>
          <h2>User Profile</h2>
          <img
            className="avatar"
            src={user.imageUrl}
            alt={'Photo of ' + user.name}
            style={{
              width: user.imageSize,
              height: user.imageSize,
              borderRadius: '50%',
            }}
          />
          <p>Name: {user.name}</p>
        </div>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
}

export default ConditionalExample;
