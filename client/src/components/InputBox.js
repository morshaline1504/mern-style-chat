import React from 'react';

function InputBox({ message, setMessage, sendMessage }) {
  return (
    <form onSubmit={sendMessage} className="input-form">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="message-input"
      />
      <button type="submit" className="send-btn">
        Send
      </button>
    </form>
  );
}

export default InputBox;