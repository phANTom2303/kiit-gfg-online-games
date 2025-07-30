import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import ticTacToeRouter, { setupTicTacToeSocket } from "./routes/tictactoe.js";
import chainReactRouter, { setUpChainReact } from "./routes/chanreaction.js";
import connect4Router, { setupConnect4Socket } from "./routes/connect4.js";
// Import more routers for other games here

const app = express();
const server = createServer(app);

// Enable CORS
app.use(cors());

// Routes for different games
app.all("/", (req, res) => res.send("Server is online."));
app.use("/tictactoe", ticTacToeRouter);
app.use("/chainreact", chainReactRouter);
app.use("/connect4", connect4Router);
// Add more routes for other games here

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Initialize TicTacToe game sockets
setupTicTacToeSocket(io);
setUpChainReact(io);
setupConnect4Socket(io);
// Add more game sockets here

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
