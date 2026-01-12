import React from 'react';

function UserList({ users }) {
  return (
    <div className="sidebar">
      <h3>Online Users ({users.length})</h3>
      <div className="users-list">
        {users.map((user, idx) => (
          <div key={idx} className="user-item">
            <span className="user-status"></span>
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;