const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:5500', // Allow requests from your frontend
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('signal', (data) => {
        console.log('Received signal:', data);
        socket.broadcast.emit('signal', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
