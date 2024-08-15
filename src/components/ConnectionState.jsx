import React from "react";

export function ConnectionState({ isConnected }) {
  return (
    <h2
      className={`${
        isConnected ? "text-green-500" : "text-red-500"
      } text-2xl font-semibold my-2`}
    >
      Connected: {"" + isConnected}
    </h2>
  );
}
