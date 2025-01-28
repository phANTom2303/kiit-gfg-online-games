import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [player, setPlayer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Initializing socket connection...");
    const primaryUrl = "http://localhost:3001";
    const secondaryUrl = "https://online-games-gfg-backend.koyeb.app";

    const connectSocket = (url) => {
      const newSocket = io(url, {
        reconnectionAttempts: 1,
        timeout: 5000,
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id, "at", url);
        setSocket(newSocket);
      });

      newSocket.on("connect_error", (err) => {
        console.log(`Connection failed to ${url}:`, err.message);
        if (url === primaryUrl) {
          console.log("Attempting connection to the secondary server...");
          connectSocket(secondaryUrl);
        }
      });

      return newSocket;
    };

    const initialSocket = connectSocket(primaryUrl);

    return () => {
      console.log("Cleaning up socket connection...");
      initialSocket?.close();
      socket?.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const eventHandlers = {
      gameCreated: ({ gameId, player, gameState }) => {
        setError(null);
        setPlayer(player);
        setGameState(gameState);
        setIsLoading(false);
      },
      gameJoined: ({ player, gameState }) => {
        setError(null);
        setPlayer(player);
        setGameState(gameState);
        setIsLoading(false);
      },
      playerJoined: ({ gameState }) => {
        setGameState(gameState);
      },
      moveMade: ({ gameState }) => {
        setGameState(gameState);
      },
      newMessage: (message) => {
        setMessages((prev) => [...prev, message]);
      },
      gameOver: ({ winner, gameState }) => {
        setGameState(gameState);
      },
      gameReset: ({ gameState }) => {
        setGameState(gameState);
      },
      playerLeft: ({ playerName }) => {
        setError(`${playerName} has left the game`);
      },
      error: (errorMessage) => {
        setError(errorMessage);
        setIsLoading(false);
        setGameState(null);
        setPlayer(null);
      },
    };

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.keys(eventHandlers).forEach((event) => {
        socket.off(event);
      });
    };
  }, [socket]);

  return (
    <GameContext.Provider
      value={{
        socket,
        gameState,
        player,
        messages,
        error,
        isLoading,
        setMessages,
        setError,
        setIsLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
