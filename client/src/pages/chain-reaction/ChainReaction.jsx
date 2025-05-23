import React, { useState, useMemo } from "react";
import { GameProvider } from "./GameContext";
import GameLobby from "./GameLobby";
import GameRoom from "./GameRoom";
import { IoMdRefresh } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { Input } from "@nextui-org/input";
import Atom from "./Atom";

const players = [
  { name: "Red", played: false, border: "border-[#ed3f3e]", isPlaying: false },
  { name: "Green", played: false, border: "border-[#52be49]", isPlaying: false },
  { name: "Yellow", played: false, border: "border-[#e5c500]", isPlaying: false },
  { name: "Blue", played: false, border: "border-[#04b5ff]", isPlaying: false },
];

const ChainReactionApp = () => {
  // Game mode state
  const [gameMode, setGameMode] = useState("landing"); // "landing", "local", "online"
  const [gameStarted, setGameStarted] = useState(false);
  const [soundStatus, setSoundStatus] = useState(true);

  // Local game state
  const size = 9;
  const [board, setBoard] = useState(
    Array(size)
      .fill()
      .map(() =>
        Array(size)
          .fill()
          .map(() => ({ atoms: 0, player: 0 }))
      )
  );
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(0);
  const [isPlayable, setPlayable] = useState(false);
  const [playerCount, setPlayerCount] = useState(2);
  
  const isInvalidPlayers = useMemo(() => {
    return playerCount >= 2 && playerCount <= 4 ? false : true;
  }, [playerCount]);

  const handleAtoms = (row, col, player) => {
    if (row >= 0 && row < size && col >= 0 && col < size) {
      let adjacent = 0;
      if (row + 1 < size) adjacent++;
      if (row - 1 >= 0) adjacent++;
      if (col + 1 < size) adjacent++;
      if (col - 1 >= 0) adjacent++;

      const newBoard = [...board];
      if (newBoard[row][col].atoms < adjacent - 1) {
        newBoard[row][col].player = player;
        newBoard[row][col].atoms++;
        players[player - 1].played = true;
        setBoard(newBoard);
        if (checkWinner(player)) {
          setWinner(player);
          setTimeout(() => {
            setPlayerCount(2);
            initBoard();
          }, 5000);
          return;
        }
        return;
      }
      newBoard[row][col].atoms = 0;
      newBoard[row][col].player = 0;
      setBoard(newBoard);

      setTimeout(() => {
        handleAtoms(row + 1, col, player);
        handleAtoms(row - 1, col, player);
        handleAtoms(row, col + 1, player);
        handleAtoms(row, col - 1, player);
      }, 300);
    }
  };

  const checkWinner = (player) => {
    if (
      board.find((row) =>
        row.find((cell) => cell.player != 0 && cell.player != player)
      ) != undefined
    )
      return false;
    if (
      players.find((player) => !player.played && player.isPlaying) != undefined
    )
      return false;
    return true;
  };

  const initBoard = () => {
    setBoard(
      Array(size)
        .fill()
        .map(() =>
          Array(size)
            .fill()
            .map(() => ({ atoms: 0, player: 0 }))
        )
    );
    players.forEach((player, index) => {
      player.played = false;
      if (index < playerCount) player.isPlaying = true;
      else player.isPlaying = false;
    });
    setPlayable(false);
    setPlayer(1);
    setWinner(0);
  };

  // Render landing page
  if (gameMode === "landing") {
    return (
      <div className="flex flex-col items-center justify-center mx-auto container px-5 w-full h-screen text-center">
        <h1 className="text-5xl font-bold text-white mb-12">Chain Reaction</h1>
        <div className="flex gap-6">
          <button
            onClick={() => setGameMode("online")}
            className="px-8 py-4 bg-blue-500 text-white text-xl rounded-md hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
          >
            Play Online
          </button>
          <button
            onClick={() => setGameMode("local")}
            className="px-8 py-4 bg-green-500 text-white text-xl rounded-md hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
          >
            Play Local
          </button>
        </div>
      </div>
    );
  }
  

  // Render local game
  if (gameMode === "local") {
    return (
      <div className="flex mx-auto container px-5 items-center justify-center w-full h-full">
        <div className="flex flex-col justify-center items-center w-full gap-4 mb-20 mt-8">
          <div className="flex flex-col items-center gap-4 mb-6">
            <h1 className="text-2xl text-white font-bold">Chain Reaction</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setGameMode("online")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Play Online
              </button>
              <button
                onClick={() => setGameMode("local")}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Play Local
              </button>
              <button
                onClick={() => setGameMode("landing")}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>

          {isPlayable ? (
            <div className="flex flex-row items-center justify-center gap-6">
              {winner == 0 ? (
                <div
                  className={`flex items-center justify-center border-4 ${
                    players[player - 1].border
                  } bg-neutral-100 p-3 rounded-lg hover:scale-105 duration-150 transition-all ease-in-out select-none`}
                >
                  <h1 className="font-bold text-neutral-800 text-lg">{`Turn of ${
                    players[player - 1].name
                  }`}</h1>
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center border-4 ${
                    players[winner - 1].border
                  } bg-neutral-100 p-3 rounded-lg hover:scale-105 duration-150 transition-all ease-in-out select-none`}
                >
                  <h1 className="font-bold text-neutral-800 text-lg">{`Winner is ${
                    players[winner - 1].name
                  }!`}</h1>
                </div>
              )}

              <div
                className="flex items-center justify-center border-4 border-blue-400 bg-neutral-100 p-3 rounded-lg duration-150 transition-all hover:scale-105 ease-in-out cursor-pointer group"
                onClick={() => {
                  setPlayerCount(2);
                  initBoard();
                }}
              >
                <IoMdRefresh className="font-bold text-neutral-800 text-3xl group-hover:rotate-180 transition-all ease-in-out duration-300" />
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-start justify-center gap-6">
              <div className="flex justify-center items-center">
                <Input
                  radius="md"
                  label="Number of players: (2-4)"
                  startContent={
                    <div className="flex justify-center items-center">
                      <IoPerson className="text-neutral-700 text-lg" />
                    </div>
                  }
                  isInvalid={isInvalidPlayers}
                  onValueChange={setPlayerCount}
                  placeholder="2"
                  color={isInvalidPlayers ? "danger" : "default"}
                  errorMessage="Enter a value between 2 and 4"
                  className="max-w-[200px] hover:scale-105 hover:transition-all hover:ease-in-out hover:duration-300 hover:shadow-lg h-full flex"
                />
              </div>

              <div
                className="flex items-center justify-center border-4 border-blue-400 bg-neutral-100 p-3 rounded-lg duration-150 transition-all hover:scale-105 ease-in-out cursor-pointer group"
                onClick={() => {
                  if (!isInvalidPlayers) {
                    initBoard();
                    setPlayable(true);
                  }
                }}
              >
                <FaArrowRight className="font-bold text-neutral-800 text-2xl transition-all ease-in-out duration-300" />
              </div>
            </div>
          )}

          <div className="flex flex-col w-full justify-center items-center h-full">
            {board.map((_, row) => (
              <div
                key={row}
                className="flex flex-row justify-center items-center w-full"
              >
                {_.map((_, col) => (
                  <div
                    key={col}
                    className={`flex border-2 ${
                      isPlayable
                        ? winner != 0
                          ? players[winner - 1].border
                          : players[player - 1].border
                        : "neutral-800"
                    } bg-[#070f2b] aspect-square w-[10%] max-w-[55px] min-w-[35px] items-center justify-center cursor-pointer hover:border-white hover:shadow-md hover:shadow-white hover:scale-110 hover:border-4 transition-all ease-in-out duration-150 select-none`}
                    onClick={() => {
                      if (
                        isPlayable &&
                        (board[row][col].player == 0 ||
                          board[row][col].player == player)
                      ) {
                        handleAtoms(row, col, player);
                        if (winner == 0) {
                          player < playerCount
                            ? setPlayer(player + 1)
                            : setPlayer(1);
                        }
                      }
                    }}
                  >
                    <Atom
                      count={board[row][col].atoms}
                      player={board[row][col].player}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render multiplayer game
  return (
    <GameProvider>
      <div className="flex flex-col items-center w-full">
        <div className="mb-6 flex justify-center">
          <h1 className="text-2xl text-white font-bold">Chain Reaction</h1>
        </div>
        
        {!gameStarted ? (
          <div className="w-full">
            <div className="mb-4 flex justify-center">
              <button
                onClick={() => setGameMode("landing")}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Back to Menu
              </button>
            </div>
            <GameLobby onGameStart={() => setGameStarted(true)} />
          </div>
        ) : (
          <GameRoom
            soundStatus={soundStatus}
            onLeaveGame={() => {
              setGameStarted(false);
              setGameMode("landing");
            }}
          />
        )}
      </div>
    </GameProvider>
  );
};

export default ChainReactionApp;