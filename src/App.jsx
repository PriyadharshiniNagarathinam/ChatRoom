// import React, { useState, useEffect } from "react";
// import { socket } from "./socket";
// import { ConnectionState } from "./components/ConnectionState";
// import { ConnectionManager } from "./components/ConnectionManager";
// import { Events } from "./components/Events";
// import { MyForm } from "./components/MyForm";
// import FormDialog from "./components/Dialog";
// import Users from "./components/Users";
// import ChatTemplate from "./components/Chattemplate";
// import JoinOrCreateRoomDialog from "./components/Dialog";

// export default function App() {
//   const getLocalStorageState = (key, defaultValue) => {
//     const storedValue = localStorage.getItem(key);
//     return storedValue ? JSON.parse(storedValue) : defaultValue;
//   };

//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [msgs, setMsgs] = useState(getLocalStorageState("msgs", []));
//   const [users, setUsers] = useState(getLocalStorageState("users", {}));
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       console.log("Ues");
//       // setIsConnect.
//     }

//     function onMessaging(data) {
//       console.log("Someone is messaging you...");
//       const msg = data.value;
//       const id = data.socketid;
//       let isSelfVal = false;
//       setUsers((previousData) => {
//         let uname = previousData[id];
//         if (id === socket.id) {
//           console.log("me is typing");
//           isSelfVal = true;
//         }
//         else {
//           console.log(`${uname} is messaging...`);     
//         }
//         setMsgs((previous) => [
//           ...previous,
//           { id, user: uname, content: msg, isSelf: isSelfVal},
//         ]);
//         return previousData;
//       });
//     }

//     function addUser(data) {
//       const idval = data.id;
//       const username = data.userName;
//       // Update the state using the functional form of setUserData
//       setUsers((previousData) => ({
//         ...previousData,
//         [idval]: username,
//       }));
//     }

//     socket.on("connect", onConnect);
//     socket.on("disconnect", onDisconnect);
//     socket.on("chat message", onMessaging);
//     socket.on("add user", addUser);

//     return () => {
//       //socket.off -> for stopping listening to those events
//       socket.off("connect", onConnect);
//       socket.off("disconnect", onDisconnect);
//       socket.off("chat message", onMessaging);
//       socket.off("add user", addUser);
//       socket.off("user data");
//     };
//   }, []);
  
//   useEffect(() => {
//     localStorage.setItem("msgs", JSON.stringify(msgs));
//     localStorage.setItem("users", JSON.stringify(users));
//   }, [users, msgs]);

//   return (
//     <div className="App">
//       <Users users={users} />
//       <ConnectionState isConnected={isConnected} />
//       <Events msgList={msgs} />
//       <ConnectionManager />
//       <MyForm />
//       <JoinOrCreateRoomDialog />
//       <ChatTemplate msgList={msgs}/>
//     </div>
//   );
// }

// App.js
import React, { useState } from 'react';
import { io } from 'socket.io-client';
import JoinOrCreateRoomDialog from './components/Dialog'

const socket = io('http://localhost:4000'); // Replace with your server's URL

const App = () => {
  const [userName, setUserName] = useState('');
  const [roomsId, setRoomsId] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(true);

  const handleJoinRoom = (roomId, userName) => {
    console.log("hey welcom!!");
    socket.emit('join room', roomId, userName);
    setOpenDialog(false);
  };

  const handleCreateRoom = (roomId, userName) => {
    setRoomsId((previousRooms) => [...previousRooms, roomId]);
    socket.emit('create room', roomId, userName);
    setOpenDialog(false);
  };

  socket.on('user joined', (users) => {
    setRoomUsers(users);
  });

  socket.on('user left', (users) => {
    setRoomUsers(users);
  });

  return (
    <div className="App">
      <h1>Socket.io Chat App</h1>
      <JoinOrCreateRoomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onJoinRoom={handleJoinRoom}
        onCreateRoom={handleCreateRoom}
        availableRooms={roomsId}
        roomsData={roomUsers}
      />
      {roomUsers.length > 0 && (
        <div>
          <h2>Room Users:</h2>
          <ul>
            {roomUsers.map((user) => (
              <li key={user.id}>{user.userName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
