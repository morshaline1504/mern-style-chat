const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());


connectDB();


let activeUsers = [];


app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }).limit(50);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});


io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);


  socket.on('join', (username) => {
    socket.username = username;
    activeUsers.push({ id: socket.id, username });

 
    io.emit('userJoined', {
      username,
      userCount: activeUsers.length,
      users: activeUsers
    });

    console.log(`${username} joined the chat`);
  });


  socket.on('sendMessage', async (data) => {
    try {
      
      const newMessage = new Message({
        username: data.username,
        message: data.message
      });
      await newMessage.save();

      
      io.emit('receiveMessage', {
        username: data.username,
        message: data.message,
        timestamp: newMessage.timestamp
      });
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });


  socket.on('disconnect', () => {
    const user = activeUsers.find(u => u.id === socket.id);

    if (user) {
      activeUsers = activeUsers.filter(u => u.id !== socket.id);

     
      io.emit('userLeft', {
        username: user.username,
        userCount: activeUsers.length,
        users: activeUsers
      });

      console.log(`${user.username} left the chat`);
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
