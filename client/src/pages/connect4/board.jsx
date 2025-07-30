import "./connect4.css";
import { useEffect } from "react";
import C4tile from "./C4tile.jsx";
import ResetButton from "../../components/resetButton/resetButton.jsx";
import playSoundOf from "../../components/soundHandler.js";
import { useGame } from "./GameContext";

function Board({ soundStatus }) {
  const { socket, gameState, player } = useGame();

  useEffect(() => {
    if (!socket || !gameState) return;
  }, [socket, gameState]);

  function onColumnClick(colNumber) {
    if (
      !gameState ||
      !player ||
      gameState.winner ||
      !gameState.players ||
      gameState.players.length !== 2
    ) {
      return;
    }

    if (gameState.currentTurn !== player.id) {
      return;
    }

    let position = null;
    for (let i = 5; i >= 0; i--) {
      if (gameState.board[i][colNumber] == null) {
        position = i;
        break;
      }
    }

    if (position == null) {
      return;
    }

    socket.emit("makeMove", {
      gameId: gameState.id,
      row: position,
      col: colNumber,
    });
    playSoundOf(player.symbol == 1 ? "pop1" : "pop2", soundStatus);
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
    <div className="connect4 h-full">
      <div className="prompt-box">{getStatusMessage()} </div>
      <div className="c4board">
        <div className="column" onClick={() => onColumnClick(0)}>
          <C4tile value={gameState.board[0][0]} />
          <C4tile value={gameState.board[1][0]} />
          <C4tile value={gameState.board[2][0]} />
          <C4tile value={gameState.board[3][0]} />
          <C4tile value={gameState.board[4][0]} />
          <C4tile value={gameState.board[5][0]} />
        </div>
        <div className="column" onClick={() => onColumnClick(1)}>
          <C4tile value={gameState.board[0][1]} />
          <C4tile value={gameState.board[1][1]} />
          <C4tile value={gameState.board[2][1]} />
          <C4tile value={gameState.board[3][1]} />
          <C4tile value={gameState.board[4][1]} />
          <C4tile value={gameState.board[5][1]} />
        </div>
        <div className="column" onClick={() => onColumnClick(2)}>
          <C4tile value={gameState.board[0][2]} />
          <C4tile value={gameState.board[1][2]} />
          <C4tile value={gameState.board[2][2]} />
          <C4tile value={gameState.board[3][2]} />
          <C4tile value={gameState.board[4][2]} />
          <C4tile value={gameState.board[5][2]} />
        </div>
        <div className="column" onClick={() => onColumnClick(3)}>
          <C4tile value={gameState.board[0][3]} />
          <C4tile value={gameState.board[1][3]} />
          <C4tile value={gameState.board[2][3]} />
          <C4tile value={gameState.board[3][3]} />
          <C4tile value={gameState.board[4][3]} />
          <C4tile value={gameState.board[5][3]} />
        </div>
        <div className="column" onClick={() => onColumnClick(4)}>
          <C4tile value={gameState.board[0][4]} />
          <C4tile value={gameState.board[1][4]} />
          <C4tile value={gameState.board[2][4]} />
          <C4tile value={gameState.board[3][4]} />
          <C4tile value={gameState.board[4][4]} />
          <C4tile value={gameState.board[5][4]} />
        </div>
        <div className="column" onClick={() => onColumnClick(5)}>
          <C4tile value={gameState.board[0][5]} />
          <C4tile value={gameState.board[1][5]} />
          <C4tile value={gameState.board[2][5]} />
          <C4tile value={gameState.board[3][5]} />
          <C4tile value={gameState.board[4][5]} />
          <C4tile value={gameState.board[5][5]} />
        </div>
        <div className="column" onClick={() => onColumnClick(6)}>
          <C4tile value={gameState.board[0][6]} />
          <C4tile value={gameState.board[1][6]} />
          <C4tile value={gameState.board[2][6]} />
          <C4tile value={gameState.board[3][6]} />
          <C4tile value={gameState.board[4][6]} />
          <C4tile value={gameState.board[5][6]} />
        </div>
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
