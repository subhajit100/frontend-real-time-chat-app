import React from "react";
import { socket } from "../socket";

export function ConnectionManager({setMessages}) {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
    setMessages([]);
  }

  return (
    <div className="flex justify-center items-center gap-x-2 my-3">
      <button
        className="p-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        onClick={connect}
      >
        Connect
      </button>
      <button
        className="p-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
        onClick={disconnect}
      >
        Disconnect
      </button>
    </div>
  );
}
