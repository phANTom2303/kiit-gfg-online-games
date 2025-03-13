import React, { useState, useEffect } from "react";
import { useGame } from "./GameContext";
import Board from "./board";
import GameChat from "./GameChat";

const GameRoom = ({ soundStatus, onLeaveGame }) => {
  const { gameState, socket, messages } = useGame();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLeaveGame = () => {
    if (socket && gameState) {
      socket.emit("leaveGame", { gameId: gameState.id });
    }
    onLeaveGame();
  };

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Setting up your game...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-6">
        <div className="inline-block bg-white rounded-lg shadow-md">
          <div className="py-2 px-4">
            <h2 className="text-lg font-bold">
              Room Code:{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {gameState?.id}
              </span>
            </h2>
            <p className="text-sm text-gray-500">
              Share this code with friends to play together!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Board soundStatus={soundStatus} />
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <GameChat socket={socket} gameState={gameState} messages={messages} />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleLeaveGame}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Leave Game
        </button>
      </div>
    </div>
  );
};

export default GameRoom;