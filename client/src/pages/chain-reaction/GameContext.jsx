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

  // Connection logic
  useEffect(() => {
    const primaryUrl = "http://localhost:3001";
    const secondaryUrl = "https://your-deployed-server.com";

    const connectSocket = (url) => {
      const newSocket = io(url, {
        reconnectionAttempts: 1,
        timeout: 5000,
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        setSocket(newSocket);
      });

      newSocket.on("connect_error", (err) => {
        console.log(`Connection failed to ${url}:`, err.message);
        if (url === primaryUrl) {
          console.log("Attempting connection to secondary server...");
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

  // Game event handlers
 // Game event handlers
useEffect(() => {
  if (!socket) return;

  const eventHandlers = {
    gameCreated: ({ gameId, player, gameState }) => {
      console.log("Game Created - Player:", player);
      console.log("Game Created - Game State:", gameState);
      setError(null);
      setPlayer(player);
      setGameState(gameState);
      setIsLoading(false);
    },
    gameJoined: ({ player, gameState }) => {
      console.log("Game Joined - Player:", player);
      console.log("Game Joined - Game State:", gameState);
      setError(null);
      setPlayer(player);
      setGameState(gameState);
      setIsLoading(false);
    },
    playerJoined: ({ gameState }) => {
      setGameState(gameState);
    },
    moveMade: ({ gameState, row, col, player }) => {
      console.log('Move made:', { gameState, row, col, player });
      setGameState(gameState);
    },
    atomsExploded: ({ gameState }) => {
      setGameState(gameState);
    },
    chainReactionComplete: ({ gameState }) => {
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
      console.error('Game Error:', errorMessage);
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