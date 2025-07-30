import React, { useState, useEffect } from "react";
import { useGame } from "./GameContext";
import Atom from "./Atom";
import { IoMdRefresh } from "react-icons/io";

const PLAYER_COLORS = {
  1: "#ed3f3e",  // Red
  2: "#52be49",  // Green
  3: "#e5c500",  // Yellow
  4: "#04b5ff"   // Blue
};

function Board({ soundStatus }) {
  const { socket, gameState, player } = useGame();
  const [animating, setAnimating] = useState(false);
  const size = 9;

  // Play sound effect for chain reactions
  useEffect(() => {
    if (soundStatus && gameState?.chainReaction) {
      const audio = new Audio("/explosion.mp3");
      audio.play().catch(console.error);
    }
  }, [gameState?.chainReaction, soundStatus]);

  // Handle cell click
  function handleClick(row, col) {
    if (
      !gameState ||
      !player ||
      gameState.winner ||
      gameState.currentTurn !== player.id ||
      animating
    ) {
      return;
    }

    const cell = gameState.board[row][col];
    if (cell.player !== 0 && cell.player !== player.id) {
      return;
    }

    setAnimating(true);
    socket.emit("makeMove", {
      gameId: gameState.id,
      row: row,
      col: col
    });

    setTimeout(() => setAnimating(false), 500);
  }

  // Reset game
  function resetGame() {
    if (!gameState) return;
    socket.emit("resetGame", { gameId: gameState.id });
  }

  // Get game status message
  function getStatusMessage() {
    if (!gameState || !gameState.players || gameState.players.length < 2) {
      return "Waiting for players...";
    }

    if (gameState.winner) {
      return `Game Over - ${gameState.winner.name} wins!`;
    }

    const currentPlayer = gameState.players.find(
      (p) => p.id === gameState.currentTurn
    );

    if (!currentPlayer) return "Waiting...";

    return player?.id === gameState.currentTurn
      ? `Your turn (${player.name})`
      : `${currentPlayer.name}'s turn`;
  }

  // Get player number (1-4) based on index in players array
  function getPlayerNumber(playerId) {
    if (!gameState || !playerId) return 0;
    const playerIndex = gameState.players.findIndex(p => p.id === playerId);
    return playerIndex !== -1 ? playerIndex + 1 : 0;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4 mb-20 mt-8">
      <div className="flex flex-row items-center justify-center gap-6">
        <div className="flex items-center justify-center border-4 border-blue-400 bg-neutral-100 p-3 rounded-lg hover:scale-105 duration-150 transition-all ease-in-out select-none">
          <h1 className="font-bold text-neutral-800 text-lg">
            {getStatusMessage()}
          </h1>
        </div>

        <div
          className="flex items-center justify-center border-4 border-blue-400 bg-neutral-100 p-3 rounded-lg duration-150 transition-all hover:scale-105 ease-in-out cursor-pointer group"
          onClick={resetGame}
        >
          <IoMdRefresh className="font-bold text-neutral-800 text-3xl group-hover:rotate-180 transition-all ease-in-out duration-300" />
        </div>
      </div>

      <div className="flex flex-col w-full justify-center items-center h-full">
        {Array(size)
          .fill()
          .map((_, row) => (
            <div
              key={row}
              className="flex flex-row justify-center items-center w-full"
            >
              {Array(size)
                .fill()
                .map((_, col) => {
                  const cellPlayer = gameState?.board?.[row]?.[col]?.player;
                  const playerNumber = getPlayerNumber(cellPlayer);
                  return (
                    <div
                      key={`${row}-${col}`}
                      className={`
                        flex border-2 bg-[#070f2b] aspect-square w-[10%] max-w-[55px] min-w-[35px] 
                        items-center justify-center cursor-pointer 
                        hover:border-white hover:shadow-md hover:shadow-white hover:scale-110 
                        hover:border-4 transition-all ease-in-out duration-150 select-none
                        ${animating ? 'pointer-events-none' : ''}
                      `}
                      onClick={() => handleClick(row, col)}
                    >
                      <Atom
                        count={gameState?.board?.[row]?.[col]?.atoms || 0}
                        player={playerNumber}
                      />
                    </div>
                  );
                })}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Board;