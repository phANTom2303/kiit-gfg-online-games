import React, { useState } from "react";
import { GameProvider } from "./GameContext";
import GameLobby from "./GameLobby";
import GameRoom from "./GameRoom";
import { useGame } from "./GameContext";
import "./tictactoe.css";

const GameContent = ({ soundStatus }) => {
  const { socket, gameState } = useGame();
  const [inGame, setInGame] = useState(false);

  if (!socket) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-4">
          <h2 className="text-xl font-bold mb-2">
            Connecting to Game Server...
          </h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  const handleGameStart = () => {
    setInGame(true);
  };

  return (
    <div className="h-full">
      {!inGame ? (
        <GameLobby onGameStart={handleGameStart} />
      ) : (
        <GameRoom soundStatus={soundStatus} />
      )}
    </div>
  );
};

function TicTacToe({ soundStatus }) {
  return (
    <GameProvider>
      <div className="game-container h-full">
        <GameContent soundStatus={soundStatus} />
      </div>
    </GameProvider>
  );
}

export default TicTacToe;
