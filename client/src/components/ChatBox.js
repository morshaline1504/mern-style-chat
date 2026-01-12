import React from 'react';

function ChatBox({ messages, username, messagesEndRef, formatTime }) {
  return (
    <div className="messages-container">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`message ${msg.username === username ? 'own-message' : ''}`}
        >
          <div className="message-header">
            <span className="message-user">{msg.username}</span>
            <span className="message-time">
              {formatTime(msg.timestamp)}
            </span>
          </div>
          <div className="message-text">{msg.message}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatBox;