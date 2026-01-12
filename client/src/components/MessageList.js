import React from 'react';


function MessageList({ msg, isOwnMessage, formatTime }) {
  return (
    <div className={`message ${isOwnMessage ? 'own-message' : ''}`}>
      <div className="message-header">
        <span className="message-user">{msg.username}</span>
        <span className="message-time">
          {formatTime(msg.timestamp)}
        </span>
      </div>
      <div className="message-text">{msg.message}</div>
    </div>
  );
}

export default MessageList;
