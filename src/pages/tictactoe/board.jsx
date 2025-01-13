import React, { useState } from "react";
import Square from "./Square";
import ResetButton from "../../components/resetButton/resetButton.jsx";
import playSoundOf from "../../components/soundHandler";
import { useGame } from "./GameContext";

function Board({ soundStatus }) {
  const { gameState, player, socket } = useGame();
  const [localSquares, setLocalSquares] = useState(
    Array(3).fill(Array(3).fill(null))
  );
  const [localTurn, setLocalTurn] = useState(1);
  const [localWinState, setLocalWinState] = useState(0);
  const [localMessage, setLocalMessage] = useState("Turn of X");

  const isMultiplayer = !!gameState;

  const getStatusMessage = () => {
    if (isMultiplayer) {
      if (gameState.winner) {
        return `${gameState.winner.symbol} is the winner!`;
      }
      if (gameState.isDraw) {
        return "It's a draw!";
      }
      return `Turn of ${
        gameState.currentTurn === player.id ? "You" : "Opponent"
      }`;
    }
    return localMessage;
  };

  const handleClick = (row, col) => {
    if (isMultiplayer) {
      if (
        gameState.board[row][col] !== null ||
        gameState.winner ||
        gameState.currentTurn !== player.id
      ) {
        console.log("Invalid move");
        return;
      }

      socket.emit("makeMove", {
        gameId: gameState.id,
        row,
        col,
      });

      playSoundOf(player.symbol === "X" ? "pop1" : "pop2", soundStatus);
    } else {
      if (
        localWinState !== 0 ||
        localTurn > 9 ||
        localSquares[row][col] !== null
      ) {
        return;
      }

      const nextSquares = JSON.parse(JSON.stringify(localSquares));

      if (localTurn % 2 === 1) {
        nextSquares[row][col] = "X";
        playSoundOf("pop1", soundStatus);
      } else {
        nextSquares[row][col] = "O";
        playSoundOf("pop2", soundStatus);
      }
      setLocalSquares(nextSquares);

      const result = checkWin(row, col, nextSquares);
      if (result !== 0) {
        setLocalMessage(`${nextSquares[row][col]} is the winner.`);
        playSoundOf("game-win", soundStatus);
        setLocalWinState(nextSquares[row][col]);
        return;
      }

      setLocalMessage(`Turn of ${localTurn % 2 === 0 ? "X" : "O"}`);
      setLocalTurn(localTurn + 1);
      if (localTurn === 9 && localWinState === 0) {
        setLocalMessage("Draw");
      }
    }
  };

  const checkWin = (row, col, grid) => {
    const currentPlayer = grid[row][col];
    let rowFlag = 1;
    let colFlag = 1;
    let d1Flag = 1;
    let d2Flag = 1;
    for (let i = 0; i < 3; i++) {
      if (grid[row][i] !== currentPlayer) rowFlag = 0;
      if (grid[i][col] !== currentPlayer) colFlag = 0;
      if (grid[i][i] !== currentPlayer) d1Flag = 0;
      if (grid[i][2 - i] !== currentPlayer) d2Flag = 0;
    }

    if (rowFlag === 1 || colFlag === 1 || d1Flag === 1 || d2Flag === 1)
      return currentPlayer;
    else return 0;
  };

  const resetGame = () => {
    if (isMultiplayer) {
      socket.emit("resetGame", { gameId: gameState.id });
    } else {
      setLocalSquares(Array(3).fill(Array(3).fill(null)));
      setLocalTurn(1);
      setLocalMessage("Turn of X");
      playSoundOf("game-reset", soundStatus);
      setLocalWinState(0);
    }
  };

  const board = isMultiplayer ? gameState.board : localSquares;

  return (
    <div className="game flex flex-col items-center gap-4">
      <div className="status text-xl font-bold mb-4">{getStatusMessage()}</div>

      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row flex">
            {row.map((cell, j) => (
              <Square
                key={`${i}-${j}`}
                value={cell}
                onSquareClick={() => handleClick(i, j)}
              />
            ))}
          </div>
        ))}
      </div>

      <ResetButton
        src={"../../images/restart icon.png"}
        alt={"reset"}
        onClick={resetGame}
      />

      {isMultiplayer && (
        <div className="players mt-4">
          <p>Players:</p>
          {gameState.players.map((p, index) => (
            <div key={index} className="player">
              {p.name} ({p.symbol}){p.id === player.id && " (You)"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Board;
