import React from "react";

export function Events({ msgList }) {
  // const list = Object.entries(msgList).map(([uname, value]) => ({
  //   uname,
  //   value,
  // }));
  return (
    <ul>
      {console.log(msgList)}
      {msgList.map((message,index) => (
        <li key={index}>{message.user}: {message.content}</li>
      ))}
    </ul>
  );
}
