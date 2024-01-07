// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors'; //cross origin resource origin

// const app = express();
// const server = http.createServer(app);

// app.use(cors());

// //The cors option ensures that the WebSocket connections are allowed only from the specified origin
// const io = new Server(server,{
//     cors: {
//         origin: "http://localhost:5173"
//     }
// });

// io.on('connection', (socket) => {
//     socket.on('chat message', (data) => {
//         io.emit('chat message', data);
//     });

//     socket.on("add user", (data) => {
//         io.emit('add user', data);
//     })
// });

// server.listen(4000, () => {
//     console.log('listening on port:4000');
// });

// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'; //cross origin resource origin
const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Replace with your client's origin
    },
});

const rooms = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join room', (roomId, userName) => {
        if (rooms[roomId]) {
            socket.join(roomId);
            rooms[roomId] = rooms[roomId] || [];
            rooms[roomId].push({ id: socket.id, userName });
            io.to(roomId).emit('user joined', rooms[roomId]);       
        }
    });

    socket.on('create room', (roomId, userName) => {
        socket.join(roomId);
        rooms[roomId] = [{ id: socket.id, userName }];

        io.to(roomId).emit('user joined', rooms[roomId]);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        // Remove the disconnected user from rooms
        for (const roomId in rooms) {
            rooms[roomId] = rooms[roomId].filter((user) => user.id !== socket.id);
            io.to(roomId).emit('user left', rooms[roomId]);
        }
    });
});

server.listen(4000, () => {
    console.log('listening on port: 4000');
});
