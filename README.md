# Chat App - Real-time Messaging

A simple realtime chat application built with React, Node.js, Socket.io, and MongoDB.

## What it does

- Send/receive messages in real-time
- See who joins or leaves the chat
- Messages are saved to MongoDB
- Shows online users
- Simple and clean UI

## Tech Stack

**Frontend:**
- React.js
- Socket.io-client
- CSS3

**Backend:**
- Node.js
- Express
- Socket.io
- MongoDB with Mongoose

## Project Structure

```
chat-app/
│
├── server/
│   ├── models/
│   │   └── Message.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.js
│   │   │   ├── MessageList.js
│   │   │   ├── UserList.js
│   │   │   └── InputBox.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## Setup Instructions

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```
MONGO_URI=mongodb://localhost:27017/chatapp
PORT=5000
```

Start the server:
```bash
npm start
```

### 2. Frontend Setup

```bash
cd client
npm install
npm start
```

The app will open at `http://localhost:3000`

## Installation Commands

### Server Dependencies
```bash
cd server
npm init -y
npm install express socket.io mongoose dotenv cors
npm install -D nodemon
```

### Client Dependencies
```bash
cd client
npx create-react-app .
npm install socket.io-client
```

---

## Running the Application

1. **Start MongoDB** (make sure MongoDB is installed and running)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd server
   npm start
   ```

3. **Start Frontend**
   ```bash
   cd client
   npm start
   ```

4. **Open multiple browser tabs** at `http://localhost:3000` to test multi-user chat

## Features Implemented

✅ Real-time messaging with WebSocket  
✅ Multiple users can chat simultaneously  
✅ Join/leave notifications  
✅ Online users list  
✅ Messages saved to MongoDB  
✅ Previous messages loaded on join  
✅ Responsive design  
✅ Clean and simple UI  

## Notes

- Make sure MongoDB is running before starting the server
- Server runs on port 5000, client on port 3000
- Open multiple browser windows to test multi-user functionality
- Messages are persistent (stored in MongoDB)

## Future Improvements

- Add user authentication
- Private messaging
- File/image sharing
- Typing indicators
- Message reactions
- Better error handling

---

Feel free to modify and enhance as needed!