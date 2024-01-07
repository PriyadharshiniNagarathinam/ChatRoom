import { Box, Typography } from "@mui/material";
import React from "react";

function Users({ users }) {
  const userList = Object.entries(users).map(([id, username]) => ({
    id,
    username,
  }));

  return (
    <div>
      <Box>
        <Typography>Users list</Typography>
        {console.log(users)}
        <ul>
          {userList.map((user) => (
            <li key={user.id}>
              {`Socket ID: ${user.id}, Username: ${user.username}`}
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
}

export default Users;
