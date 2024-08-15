const JoinRoom = ({
  handleJoinRoom,
  userName,
  setUserName,
  roomId,
  setRoomId,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleJoinRoom();
    }
  };
  return (
    <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md">
      {/* Name Input */}
      <div className="mb-4 w-full">
        <label
          htmlFor="name"
          className="block text-gray-700 font-semibold mb-2"
        >
          Username:
        </label>
        <input
          id="name"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Room ID Input */}
      <div className="mb-4 w-full">
        <label
          htmlFor="roomId"
          className="block text-gray-700 font-semibold mb-2"
        >
          Room ID:
        </label>
        <input
          id="roomId"
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Join Room Button */}
      <button
        onClick={handleJoinRoom}
        className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
