import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';
import ChatBox from './components/ChatBox';
import UserList from './components/UserList';
import InputBox from './components/InputBox';

const socket = io('http://localhost:5001');

function App() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load previous messages when app starts
    fetch('http://localhost:5001/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error('Error loading messages:', err));

    // Listen for incoming messages
    socket.on('receiveMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });

    // User joined notification
    socket.on('userJoined', (data) => {
      setOnlineUsers(data.users);
      addNotification(`${data.username} joined the chat`);
    });

    // User left notification
    socket.on('userLeft', (data) => {
      setOnlineUsers(data.users);
      addNotification(`${data.username} left the chat`);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('userJoined');
      socket.off('userLeft');
    };
  }, []);

  useEffect(() => {
    // Auto scroll to bottom when new message comes
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addNotification = (text) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, text }]);

    // Remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      socket.emit('join', username);
      setIsJoined(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', {
        username,
        message
      });
      setMessage('');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Login screen
  if (!isJoined) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome to ChatApp</h1>
          <form onSubmit={handleJoin}>
            <input
              type="text"
              placeholder="Enter your name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
              maxLength={20}
            />
            <button type="submit" className="join-btn">
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Chat screen
  return (
    <div className="app-container">
      {/* Notifications */}
      <div className="notifications">
        {notifications.map(notif => (
          <div key={notif.id} className="notification">
            {notif.text}
          </div>
        ))}
      </div>

      <div className="chat-container">
        {/* Sidebar */}
        <UserList users={onlineUsers} />

        {/* Main chat area */}
        <div className="main-chat">
          <div className="chat-header">
            <h2>Group Chat</h2>
            <span className="current-user">Logged in as: {username}</span>
          </div>

          <ChatBox
            messages={messages}
            username={username}
            messagesEndRef={messagesEndRef}
            formatTime={formatTime}
          />

          <InputBox
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;