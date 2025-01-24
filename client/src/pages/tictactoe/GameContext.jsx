import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [player, setPlayer] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("Initializing socket connection...");
    let baseUrl = "http://localhost:3001";
    try {
      baseUrl = process.env.BASE_URL;
    } catch (error) {
      console.error(error);
    }
    let newSocket = io(baseUrl);
    if (newSocket == null) {
      newSocket = io("https://online-games-gfg-backend.koyeb.app");
    }

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      setSocket(newSocket);
    });

    return () => {
      console.log("Cleaning up socket connection");
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const eventHandlers = {
      gameCreated: ({ gameId, player, gameState }) => {
        console.log("Game Created:", { gameId, player, gameState });
        setPlayer(player);
        setGameState(gameState);
      },
      gameJoined: ({ player, gameState }) => {
        console.log("Game Joined:", { player, gameState });
        setPlayer(player);
        setGameState(gameState);
      },
      playerJoined: ({ gameState }) => {
        console.log("Player Joined:", gameState);
        setGameState(gameState);
      },
      moveMade: ({ gameState }) => {
        console.log("Move Made:", gameState);
        setGameState(gameState);
      },
      newMessage: (message) => {
        console.log("New Message:", message);
        setMessages((prev) => [...prev, message]);
      },
      gameOver: ({ winner, gameState }) => {
        console.log("Game Over:", { winner, gameState });
        setGameState(gameState);
      },
      gameReset: ({ gameState }) => {
        console.log("Game Reset:", gameState);
        setGameState(gameState);
      },
      playerLeft: ({ playerName }) => {
        console.log("Player Left:", playerName);
        // Handle player disconnection if needed
      },
      error: (error) => {
        console.error("Socket Error:", error);
      },
    };

    // Register all event handlers
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    // Cleanup function to remove all event handlers
    return () => {
      Object.keys(eventHandlers).forEach((event) => {
        socket.off(event);
      });
    };
  }, [socket]);

  const contextValue = {
    socket,
    gameState,
    player,
    messages,
    setMessages,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
