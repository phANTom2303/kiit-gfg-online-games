import express from "express";
import otpGenerator from "otp-generator";

const router = express.Router();

const games = new Map();
const players = new Map();

router.all("/", (req, res) => {
  res.send("TicTacToe is online.");
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

// Function to check for a winner
function checkWinner(board) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return board[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      return board[0][i];
    }
  }
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return board[0][0];
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    return board[0][2];
  }
  return null;
}

// Function to check if the board is full (resulting in a draw)
function isBoardFull(board) {
  return board.every((row) => row.every((cell) => cell !== null));
}

// Tic-Tac-Toe Socket.IO logic
export function setupTicTacToeSocket(io) {
  io.of("/tictactoe").on("connection", (socket) => {
    console.log("User connected to TicTacToe:", socket.id);

    socket.on("createGame", (playerName) => {
      console.log(`Creating game for player: ${playerName}`);
      const gameId = generateUniqueGameCode();
      const player = { id: socket.id, name: playerName, symbol: "X" };

      const gameState = {
        id: gameId,
        board: Array(3)
          .fill(null)
          .map(() => Array(3).fill(null)),
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

      const player = { id: socket.id, name: playerName, symbol: "O" };
      game.players.push(player);
      players.set(socket.id, { gameId, name: playerName });

      socket.join(gameId);
      socket.emit("gameJoined", { gameId, player, gameState: game });
      io.of("/tictactoe")
        .to(gameId)
        .emit("playerJoined", { player, gameState: game });
    });

    socket.on("makeMove", ({ gameId, row, col }) => {
      const game = games.get(gameId);
      if (!game || game.winner || game.currentTurn !== socket.id) return;

      const player = game.players.find((p) => p.id === socket.id);
      if (!player || game.board[row][col] !== null) return;

      game.board[row][col] = player.symbol;
      const winner = checkWinner(game.board);

      if (winner) {
        game.winner = player;
        io.of("/tictactoe")
          .to(gameId)
          .emit("gameOver", { winner: player, gameState: game });
      } else if (isBoardFull(game.board)) {
        game.winner = "draw";
        io.of("/tictactoe")
          .to(gameId)
          .emit("gameOver", { winner: "draw", gameState: game });
      } else {
        game.currentTurn = game.players.find((p) => p.id !== socket.id).id;
        io.of("/tictactoe")
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
        io.of("/tictactoe").to(gameId).emit("newMessage", chatMessage);
      }
    });

    socket.on("resetGame", ({ gameId }) => {
      const game = games.get(gameId);
      if (game) {
        game.board = Array(3)
          .fill(null)
          .map(() => Array(3).fill(null));
        game.currentTurn = game.players[0].id;
        game.winner = null;

        io.of("/tictactoe").to(gameId).emit("gameReset", { gameState: game });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      const player = players.get(socket.id);
      if (player) {
        const game = games.get(player.gameId);
        if (game) {
          io.of("/tictactoe").to(player.gameId).emit("playerLeft", {
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
