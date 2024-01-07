// import React from "react";
// import Avatar from "@mui/material/Avatar";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";

// const Message = ({ isSelf, user, content }) => {
//   return (
//     <Box
//       sx={{
//         marginBottom: 2,
//         display: "flex",
//         alignItems: isSelf ? "flex-end" : "flex-start",
//         flexDirection: isSelf ? "row-reverse" : "row",
//       }}
//     >
//       {!isSelf && (
//         <Avatar sx={{ marginRight: 2 }} alt={user} src={user.avatar} />
//       )}
//       <Paper
//         elevation={3}
//         sx={{
//           maxWidth: "70%",
//           padding: 1,
//           borderRadius: 1,
//           backgroundColor: isSelf ? "#e0f7fa" : "#fff",
//         }}
//       >
//         <Typography variant="body1">{content}</Typography>
//       </Paper>
//     </Box>
//   );
// };

// const ChatTemplate = ({msgList}) => {
//   const messages = [
//     { user: "John", content: "Hello!", isSelf: false },
//     { user: "Jane", content: "Hi there!", isSelf: true },
//     // Add more messages as needed
//   ];

//   return (
//     <Container
//       sx={{
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Paper
//         sx={{
//           width: "80%",
//           maxHeight: "70vh",
//           overflowY: "auto",
//           padding: 2,
//         }}
//       >
//         {msgList.map((message, index) => (
//           <Message
//             key={index}
//             user={message.user}
//             content={message.content}
//             isSelf={message.isSelf}
//           />
//         ))}
//       </Paper>
//     </Container>
//   );
// };

// export default ChatTemplate;

import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Message = ({ isSelf, user, content }) => {
  return (
    <Box
      sx={{
        marginBottom: 2,
        display: "flex",
        alignItems: isSelf ? "flex-end" : "flex-start",
        flexDirection: isSelf ? "row-reverse" : "row",
      }}
    >
      {!isSelf && (
        <Avatar sx={{ marginRight: 2 }} alt={user} />
      )}
      <Paper
        elevation={3}
        sx={{
          maxWidth: "70%",
          padding: 1,
          borderRadius: 1,
          backgroundColor: isSelf ? "#e0f7fa" : "#fff",
        }}
      >
        <Typography variant="body1">{content}</Typography>
      </Paper>
    </Box>
  );
};

const ChatTemplate = ({ msgList }) => {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: "80%",
          maxHeight: "70vh",
          overflowY: "auto",
          padding: 2,
        }}
      >
        {msgList.length > 0 ? (
          msgList.map((message, index) => (
            <Message
              key={index}
              user={message.user}
              content={message.content}
              isSelf={message.isSelf}
            />
          ))
        ) : (
          <Typography variant="body1">No messages yet.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ChatTemplate;

