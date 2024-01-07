// import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { socket } from "../socket";

// export default function FormDialog() {
//   const [open, setOpen] = React.useState(true);
//   const [userName, setUserName] = React.useState("");
//   const [name, setName] = React.useState("");

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const saveChanges = () => {
//     // event.preventDefault();
//     socket.connect();
//     socket.on("connect", () => {
//       const id = socket.id;
//       let sampData = { id: id, userName: userName };
//       // console.log(id);
//       socket.emit("add user",sampData);
//       handleClose();
//     })
//   }
//   return (
//     <React.Fragment>
//       {/* <Button variant="outlined" onClick={handleClickOpen}>
//         Change User Name
//       </Button> */}
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>User Details</DialogTitle>
//         <DialogContent
//           sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}
//         >
//           <DialogContentText>
//             Enter your Name and Username to join the chat room.
//           </DialogContentText>
//           <TextField
//             id="username"
//             label="User Name"
//             variant="outlined"
//             fullWidth
//             value={userName}
//             onChange={(event) => {
//               setUserName(event.target.value);
//               // console.log(event.target.value);
//               // console.log(userName);
//             }}
//           />
//           <TextField
//             id="name"
//             label="Name"
//             variant="outlined"
//             fullWidth
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={saveChanges} variant="contained" color="primary">
//             Join Room
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const JoinOrCreateRoomDialog = ({
  open,
  onClose,
  onJoinRoom,
  onCreateRoom,
  availableRooms,
  roomsData
}) => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const handleJoinRoom = () => {
    console.log(availableRooms);
    console.log(roomsData);
    // if (roomId.trim() !== "" && availableRooms[roomId]) {
    //   setError("");
    //   onJoinRoom(roomId.trim(),userName);
    // } else {
    //   setError("Please enter a valid room ID.");
    // }
  };

  const handleCreateRoom = () => {
    if (roomId.trim() !== "") {
      setError("");
      onCreateRoom(roomId.trim(),userName);
    } else {
      setError("Please enter a valid room ID.");
    }
  };

  const handleClose = () => {
    setError("");
    setRoomId("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Join or Create a Room</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the Room ID to join an existing room or create your own room.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="User Name"
          type="text"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={error !== ""}
          helperText={error}
        />
        <TextField
          margin="dense"
          id="roomId"
          label="Room ID"
          type="text"
          fullWidth
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          error={error !== ""}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleJoinRoom} variant="outlined" color="primary">
          Join Room
        </Button>
        <Button onClick={handleCreateRoom} variant="contained" color="primary">
          Create Room
        </Button>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinOrCreateRoomDialog;
