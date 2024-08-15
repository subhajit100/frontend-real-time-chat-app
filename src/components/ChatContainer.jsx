import React, { useState } from "react";
import { socket } from "../socket";

const ChatContainer = ({ presentUser, roomId, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { userName: "You", message: newMessage }]);
      console.log(newMessage);
      setNewMessage("");
      // TODO:- sockt send-msg event emit with roomId, userName, message
      socket.emit("send-msg", {
        roomId,
        userName: presentUser,
        message: newMessage,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen w-[40%] mx-auto bg-gray-100 shadow-lg my-5">
      <h2 className="text-2xl font-semibold text-gray-500 text-center">
        Welcome to {roomId}
      </h2>
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.userName === roomId
                ? "justify-center"
                : msg.userName === "You"
                ? "justify-end"
                : "justify-start"
            } mb-2`}
          >
            <div
              className={`${
                msg.userName === roomId ? 'text-green-600':
                msg.userName === "You"
                  ? "bg-blue-500 text-white rounded-lg "
                  : "bg-gray-300 text-black rounded-lg "
              } px-4 py-2 max-w-xs`}
            >
              <span className="font-semibold">{msg.userName}: </span>
              <span>{msg.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow p-2 border rounded-lg focus:outline-none"
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
