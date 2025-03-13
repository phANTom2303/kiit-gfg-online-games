import React, { useState, useEffect } from "react";
import { useGame } from "./GameContext";

const GameLobby = ({ onGameStart }) => {
  const { socket, error, setError, isLoading, setIsLoading, gameState } = useGame();
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [playerCount, setPlayerCount] = useState(2);

  useEffect(() => {
    if (gameState && !error) {
      onGameStart();
    }
  }, [gameState, error, onGameStart]);

  const createGame = () => {
    if (!playerName.trim()) {
      setError("Please enter your name");
      return;
    }

    setIsLoading(true);
    setError(null);
    socket.emit("createGame", { 
      playerName,
      gameType: "chainReaction",
      playerCount 
    });
  };

  const joinGame = (e) => {
    e.preventDefault();
    if (!playerName.trim() || !roomCode.trim()) {
      setError("Please enter both your name and room code");
      return;
    }

    setIsLoading(true);
    setError(null);
    socket.emit("joinGame", { 
      gameId: roomCode, 
      playerName,
      gameType: "chainReaction" 
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Chain Reaction Online</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Setting up your game...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Number of Players</label>
            <select
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={2}>2 Players</option>
              <option value={3}>3 Players</option>
              <option value={4}>4 Players</option>
            </select>
          </div>

          <button
            onClick={createGame}
            className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Create New Game
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or join existing game</span>
            </div>
          </div>

          <form onSubmit={joinGame}>
            <input
              type="text"
              placeholder="Enter room code"
              value={roomCode.toUpperCase()}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Join Game
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default GameLobby;