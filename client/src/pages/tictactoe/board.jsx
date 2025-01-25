import { useEffect } from "react";
import Square from "./square.jsx";
import ResetButton from "../../components/resetButton/resetButton.jsx";
import playSoundOf from "../../components/soundHandler.js";
import { useGame } from "./GameContext.jsx";

function Board({ soundStatus }) {
  const { socket, gameState, player } = useGame();

  useEffect(() => {
    if (!socket || !gameState) return;
  }, [socket, gameState]);

  function handleClick(i, j) {
    // Check if it's valid to make a move
    if (
      !gameState ||
      !player ||
      gameState.winner ||
      !gameState.players ||
      gameState.players.length !== 2
    ) {
      return;
    }

    // Check if it's the player's turn
    if (gameState.currentTurn !== player.id) {
      return;
    }

    if (gameState.board[i][j] !== null) {
      return;
    }

    socket.emit("makeMove", {
      gameId: gameState.id,
      row: i,
      col: j,
    });

    playSoundOf(player.symbol === "X" ? "pop1" : "pop2", soundStatus);
  }

  function resetGame() {
    if (!gameState) return;

    socket.emit("resetGame", {
      gameId: gameState.id,
    });

    playSoundOf("game-reset", soundStatus);
  }

  const getStatusMessage = () => {
    if (!gameState || !gameState.players || gameState.players.length < 2) {
      return "Waiting for opponent...";
    }

    if (gameState.winner) {
      if (gameState.winner === "draw") {
        return "Game Over - It's a Draw!";
      }
      return `Game Over - ${gameState.winner.name} wins!`;
    }

    const currentPlayer = gameState.players.find(
      (p) => p.id === gameState.currentTurn
    );
    if (!currentPlayer) return "";

    if (player.id === gameState.currentTurn) {
      return "Your turn";
    } else {
      return `${currentPlayer.name}'s turn`;
    }
  };

  return (
    <div className="tictactoe">
      <div className="prompt-box">{getStatusMessage()}</div>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="row">
            {[0, 1, 2].map((col) => (
              <Square
                key={`${row}-${col}`}
                value={gameState?.board?.[row]?.[col]}
                onSquareClick={() => handleClick(row, col)}
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
    </div>
  );
}

export default Board;
