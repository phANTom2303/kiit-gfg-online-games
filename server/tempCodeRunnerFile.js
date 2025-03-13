import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import otpGenerator from "otp-generator";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Game state storage
const games = new Map();
const players = new Map();

// Constants
const BOARD_SIZE = 9;
const MAX_PLAYERS = 4;
const MIN_PLAYERS = 2;

// Player colors
const PLAYER_COLORS = {
  1: "#ed3f3e", // Red
  2: "#52be49", // Green
  3: "#e5c500", // Yellow
  4: "#04b5ff", // Blue
};

// Helper Functions
function generateUniqueGameCode() {
  const code = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });

  return games.has(code) ? generateUniqueGameCode() : code;
}

function createInitialBoard() {
  return Array(BOARD_SIZE).fill().map(() => 
    Array(BOARD_SIZE).fill().map(() => ({ 
      atoms: 0, 
      player: 0 
    }))
  );
}

function getCriticalMass(row, col) {
  // Corner cells
  if ((row === 0 || row === BOARD_SIZE - 1) && (col === 0 || col === BOARD_SIZE - 1)) {
    return 2;
  }
  // Edge cells
  if (row === 0 || row === BOARD_SIZE - 1 || col === 0 || col === BOARD_SIZE - 1) {
    return 3;
  }
  // Center cells
  return 4;
}

function handleChainReaction(gameState, row, col, playerId) {
  if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
    return false;
  }

  const cell = gameState.board[row][col];
  const criticalMass = getCriticalMass(row, col);

  if (cell.atoms >= criticalMass) {
    // Reset current cell
    cell.atoms = 0;
    cell.player = 0;

    // Define adjacent cells
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let chainReactionOccurred = false;

    // Process each adjacent cell
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;

      if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
        const adjacentCell = gameState.board[newRow][newCol];
        adjacentCell.atoms++;
        adjacentCell.player = playerId;

        if (handleChainReaction(gameState, newRow, newCol, playerId)) {
          chainReactionOccurred = true;
        }
      }
    });

    return true;
  }

  return false;
}

function checkWinner(gameState) {
  // Only check for winner if all players have made at least one move
  if (!gameState.players.every(player => player.played)) {
    return null;
  }

  const activePlayers = new Set();

  // Count cells for each player
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = gameState.board[row][col];
      if (cell.player !== 0) {
        activePlayers.add(cell.player);
      }
    }
  }

  // If only one player has atoms remaining
  if (activePlayers.size === 1) {
    const winnerId = Array.from(activePlayers)[0];
    return gameState.players.find(p => p.id === winnerId);
  }

  return null;
}

// Socket Event Handlers
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Create Game
  socket.on("createGame", ({ playerName, playerCount }) => {
    const gameId = generateUniqueGameCode();
    
    const player = {
      id: socket.id,
      name: playerName,
      color: 1,
      played: false
    };

    const gameState = {
      id: gameId,
      board: createInitialBoard(),
      players: [player],
      currentTurn: player.id,
      messages: [],
      winner: null,
      playerCount: Math.min(Math.max(playerCount, MIN_PLAYERS), MAX_PLAYERS)
    };

    games.set(gameId, gameState);
    players.set(socket.id, { gameId, name: playerName });
    
    socket.join(gameId);
    socket.emit("gameCreated", { gameId, player, gameState });
  });

  // Join Game
  socket.on("joinGame", ({ gameId, playerName }) => {
    const game = games.get(gameId.toUpperCase());

    if (!game) {
      socket.emit("error", "Game not found");
      return;
    }

    if (game.players.length >= game.playerCount) {
      socket.emit("error", "Game is full");
      return;
    }

    const player = {
      id: socket.id,
      name: playerName,
      color: game.players.length + 1,
      played: false
    };

    game.players.push(player);
    players.set(socket.id, { gameId: gameId.toUpperCase(), name: playerName });

    socket.join(gameId.toUpperCase());
    socket.emit("gameJoined", { player, gameState: game });
    io.to(gameId.toUpperCase()).emit("playerJoined", { gameState: game });
  });

  // Make Move
  socket.on("makeMove", ({ gameId, row, col }) => {
    const game = games.get(gameId);
    if (!game || game.currentTurn !== socket.id || game.winner) {
      return;
    }

    const player = game.players.find(p => p.id === socket.id);
    if (!player) return;

    const cell = game.board[row][col];
    if (cell.player !== 0 && cell.player !== player.id) return;

    // Make the move
    cell.atoms++;
    cell.player = player.id;
    player.played = true;

    // Handle chain reaction
    const chainReactionOccurred = handleChainReaction(game, row, col, player.id);
    
    if (chainReactionOccurred) {
      io.to(gameId).emit("chainReactionComplete", { gameState: game });
    }

    // Check for winner
    const winner = checkWinner(game);
    if (winner) {
      game.winner = winner;
      io.to(gameId).emit("gameOver", { winner, gameState: game });
      return;
    }

    // Update turn
    const currentIndex = game.players.findIndex(p => p.id === player.id);
    game.currentTurn = game.players[(currentIndex + 1) % game.players.length].id;

    io.to(gameId).emit("moveMade", {
      row,
      col,
      player,
      gameState: game,
      chainReaction: chainReactionOccurred
    });
  });

  // Reset Game
  socket.on("resetGame", ({ gameId }) => {
    const game = games.get(gameId);
    if (!game) return;

    game.board = createInitialBoard();
    game.currentTurn = game.players[0].id;
    game.winner = null;
    game.players.forEach(p => p.played = false);

    io.to(gameId).emit("gameReset", { gameState: game });
  });

  // Chat Message
  socket.on("sendMessage", ({ gameId, message }) => {
    const game = games.get(gameId);
    const player = players.get(socket.id);

    if (game && player) {
      const chatMessage = {
        sender: player.name,
        content: message,
        timestamp: new Date()
      };

      game.messages.push(chatMessage);
      io.to(gameId).emit("newMessage", chatMessage);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    const player = players.get(socket.id);
    if (player) {
      const game = games.get(player.gameId);
      if (game) {
        io.to(player.gameId).emit("playerLeft", {
          playerId: socket.id,
          playerName: player.name
        });

        game.players = game.players.filter(p => p.id !== socket.id);
        
        if (game.players.length === 0) {
          games.delete(player.gameId);
        } else if (game.currentTurn === socket.id) {
          // Update turn if disconnected player was current
          const nextPlayer = game.players[0];
          game.currentTurn = nextPlayer.id;
          io.to(player.gameId).emit("moveMade", {
            gameState: game
          });
        }
      }
      players.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});