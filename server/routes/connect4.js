import express from "express";
import otpGenerator from "otp-generator";

const router = express.Router();
const games = new Map();
const players = new Map();

router.all("/", (req, res) => {
  res.send("Connect 4 is online.");
});

// Function to generate a unique game code
function generateUniqueGameCode() {
  const code = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });

  if (games.has(code)) {
    return generateUniqueGameCode();
  }

  return code;
}

function checkWinner(board, row, col, player) {
  let row_count = row_freq(board, row, col, player);
  let col_count = col_freq(board, row, col, player);
  let left_diag_count = left_diagonal_freq(board, row, col, player);
  let right_diag_count = right_diagonal_freq(board, row, col, player);

  if (
    row_count == 4 ||
    col_count == 4 ||
    left_diag_count == 4 ||
    right_diag_count == 4
  ) {
    console.log("Row Count = " + row_count);
    console.log("Column Count = " + col_count);
    console.log("Left Diagonal Count = " + left_diag_count);
    console.log("Right Diagonal Count = " + right_diag_count);
    return true;
  } else return false;
}

function row_freq(board, row, col, player) {
  let count = 1;
  for (
    let i = col + 1;
    i < 7;
    i++ // count to the right of the player
  ) {
    if (board[row][i] != player.symbol) break;
    count += 1;
  }

  for (
    let i = col - 1;
    i >= 0;
    i-- // counting to the left of player
  ) {
    if (board[row][i] != player.symbol) break;
    count += 1;
  }
  return count;
}

function col_freq(board, row, col, player) {
  let count = 1;
  for (
    let i = row + 1;
    i < 6;
    i++ // count below the player
  ) {
    if (board[i][col] != player.symbol) break;
    count += 1;
  }

  for (
    let i = row - 1;
    i >= 0;
    i-- // counting above the player
  ) {
    if (board[i][col] != player.symbol) break;
    count += 1;
  }
  return count;
}

function left_diagonal_freq(board, row, col, player) {
  if ((row >= 3 && col <= 2) || (row <= 2 && col >= 4)) return 0;

  let count = 1;
  let i = row + 1;
  let j = col + 1;
  while (i < 6 && j < 7) {
    // counting in bottom right direction
    if (board[i][j] == player.symbol) {
      count += 1;
      i++;
      j++;
    } else break;
  }

  i = row - 1;
  j = col - 1;

  while (i >= 0 && j >= 0) {
    // counting in top left direction
    if (board[i][j] == player.symbol) {
      count += 1;
      i--;
      j--;
    } else break;
  }
  return count;
}

function right_diagonal_freq(board, row, col, player) {
  if ((row <= 2 && col <= 2) || (row >= 3 && col >= 4)) return 0;

  let count = 1;
  let i = row + 1;
  let j = col - 1;

  while (i < 6 && j >= 0) {
    // counting in bottom left direction
    if (board[i][j] == player.symbol) {
      count += 1;
      i++;
      j--;
    } else break;
  }

  i = row - 1;
  j = col + 1;

  while (i >= 0 && j < 7) {
    // counting in top right direction
    if (board[i][j] == player.symbol) {
      count += 1;
      i--;
      j++;
    } else break;
  }

  return count;
}

function isBoardFull(board) {
  return board.every((row) => row.every((cell) => cell !== null));
}

// Connect4 Socket.IO logic
export function setupConnect4Socket(io) {
  io.of("/connect4").on("connection", (socket) => {
    console.log("User connected to Connect4:", socket.id);

    socket.on("createGame", (playerName) => {
      console.log(`Creating game for player: ${playerName}`);
      const gameId = generateUniqueGameCode();
      const player = { id: socket.id, name: playerName, symbol: 1 };

      const gameState = {
        id: gameId,
        board: Array(6)
          .fill(null)
          .map(() => Array(7).fill(null)),
        players: [player],
        currentTurn: player.id,
        messages: [],
        winner: null,
      };

      games.set(gameId, gameState);
      players.set(socket.id, { gameId, name: playerName });

      socket.join(gameId);
      console.log(`Game created with ID: ${gameId}`);

      socket.emit("gameCreated", { gameId, player, gameState });
    });

    socket.on("joinGame", ({ gameId, playerName }) => {
      console.log(`Player ${playerName} attempting to join game ${gameId}`);
      const game = games.get(gameId.toUpperCase());

      if (!game) {
        socket.emit("error", "Game not found.");
        return;
      }
      if (game.players.length >= 2) {
        socket.emit("error", "Game is full.");
        return;
      }

      const player = { id: socket.id, name: playerName, symbol: -1 };
      game.players.push(player);
      players.set(socket.id, { gameId, name: playerName });

      socket.join(gameId);
      socket.emit("gameJoined", { gameId, player, gameState: game });
      io.of("/connect4")
        .to(gameId)
        .emit("playerJoined", { player, gameState: game });
    });

    socket.on("makeMove", ({ gameId, row, col }) => {
      const game = games.get(gameId);
      if (!game || game.winner || game.currentTurn !== socket.id) return;

      const player = game.players.find((p) => p.id === socket.id);
      if (!player || game.board[row][col] !== null) return;

      game.board[row][col] = player.symbol;
      const winner = checkWinner(game.board, row, col, player);

      if (winner) {
        game.winner = player;
        io.of("/connect4")
          .to(gameId)
          .emit("gameOver", { winner: player, gameState: game });
      } else if (isBoardFull(game.board)) {
        game.winner = "draw";
        io.of("/connect4")
          .to(gameId)
          .emit("gameOver", { winner: "draw", gameState: game });
      } else {
        game.currentTurn = game.players.find((p) => p.id !== socket.id).id;
        io.of("/connect4")
          .to(gameId)
          .emit("moveMade", { row, col, player, gameState: game });
      }
    });

    socket.on("sendMessage", ({ gameId, message }) => {
      const game = games.get(gameId);
      const player = players.get(socket.id);

      if (game && player) {
        const chatMessage = {
          sender: player.name,
          content: message,
          timestamp: new Date(),
        };
        game.messages.push(chatMessage);
        io.of("/connect4").to(gameId).emit("newMessage", chatMessage);
      }
    });

    socket.on("resetGame", ({ gameId }) => {
      const game = games.get(gameId);
      if (game) {
        game.board = Array(6)
          .fill(null)
          .map(() => Array(7).fill(null));
        game.currentTurn = game.players[0].id;
        game.winner = null;

        io.of("/connect4").to(gameId).emit("gameReset", { gameState: game });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      const player = players.get(socket.id);
      if (player) {
        const game = games.get(player.gameId);
        if (game) {
          io.of("/connect4").to(player.gameId).emit("playerLeft", {
            playerId: socket.id,
            playerName: player.name,
          });

          game.players = game.players.filter((p) => p.id !== socket.id);
          if (game.players.length === 0) {
            games.delete(player.gameId);
          }
        }
        players.delete(socket.id);
      }
    });
  });
}

export default router;
