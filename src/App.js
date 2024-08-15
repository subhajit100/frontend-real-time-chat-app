import { useEffect, useState } from "react";
import "./App.css";
import ChatContainer from "./components/ChatContainer";
import JoinRoom from "./components/JoinRoom";
import { socket } from "./socket";
import { ConnectionManager } from "./components/ConnectionManager";
import { ConnectionState } from "./components/ConnectionState";

function App() {
  const [isJoinRoomVisible, setIsJoinRoomVisible] = useState(true);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      setIsJoinRoomVisible(true);
    }

    function updateChatWithOthersMessage({ userName, message }) {
      setMessages((prevMsgs) => [...prevMsgs, { userName, message }]);
    }

    function updateChatForNewlyJoined({ roomId, userName }) {
      setMessages((prevMsgs) => [
        ...prevMsgs,
        { userName: roomId, message: `${userName} joined the room` },
      ]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("recieve-msg", updateChatWithOthersMessage);
    socket.on("newly-joined", updateChatForNewlyJoined);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("recieve-msg", updateChatWithOthersMessage);
      socket.off("newly-joined", updateChatForNewlyJoined);
    };
  }, []);

  const handleJoinRoom = () => {
    if (userName !== "" && roomId !== "") {
      // TODO:- emit socket with 'join-room' to server and also remove this section then
      socket.emit("join-room", { roomId, userName });
      console.log(`Name: ${userName}, Room ID: ${roomId}`);
      setIsJoinRoomVisible(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold my-5 text-gray-600">
        Real-time chat App with Socket.io
      </h1>
      <ConnectionManager setMessages={setMessages} />
      <ConnectionState isConnected={isConnected} />
      {isConnected && (
        <>
          {" "}
          {isJoinRoomVisible && (
            <JoinRoom
              handleJoinRoom={handleJoinRoom}
              userName={userName}
              setUserName={setUserName}
              roomId={roomId}
              setRoomId={setRoomId}
            />
          )}
          {!isJoinRoomVisible && (
            <ChatContainer
              presentUser={userName}
              roomId={roomId}
              messages={messages}
              setMessages={setMessages}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
