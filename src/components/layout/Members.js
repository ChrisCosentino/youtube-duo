import React from 'react';

const Members = ({ users }) => {
  return (
    <div className='members-container'>
      <h1>Members</h1>
      <div className='members'>
        {users.map((user, index) => (
          <div className='member' key={index}>
            {user}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
