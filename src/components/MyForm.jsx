import React, { useState } from "react";
import { socket } from "../socket";

export function MyForm({userName}) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socketid, setSocketid] = useState(null);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    let socketid = socket.id;
    socket.timeout(5000).emit("chat message", {value:value, socketid:socketid}, () => {
      console.log("my socket is"+socket.id);
      setIsLoading(false);
    });
    setValue("");
    setSocketid(null);
  }

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} value={value} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
