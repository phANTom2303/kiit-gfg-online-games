import { useState } from "react";
import SelectPlayers from "./SelectPlayers/selectPlayer.jsx";
import PlayerDisplay from "./playerDisplay.jsx";
import ResetButton from "../../components/resetButton/resetButton.jsx";
import PlayerTile from "./players/playerTile.jsx";
import playSoundOf from "../../components/soundHandler.js";
import "./snake-and-ladders.css";
export default function SnakeAndLadders({ soundStatus }) {
  const [playerCount, setPlayerCount] = useState(0);
  const [playerPostions, updatePlayerPositions] = useState(Array(4).fill(null));
  const [message, updateMessage] = useState("Waiting for Dice Roll...");
  const [currentPlayer, updateCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState(-1);
  const [isRolling, setIsRolling] = useState(false);
  const [board, updateBoard] = useState([
    0, +22, 0, 0, 0, 0, 0, +33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, +76, 0, 0, 0,
    0, 0, 0, 0, 0, -8, 0, 0, +67, 0, 0, 0, 0, 0, -14, 0, 0, +78, 0, 0, 0, 0, 0,
    -4, 0, 0, 0, 0, 0, -32, 0, 0, 0, 0, 0, 0, 0, 0, -36, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, +87, 0, 0, 0, 0, 0, 0, 0, +99, 0, 0, +94, -53, 0, 0, 0, 0, 0, -69,
    0, 0, 0, 0, -24, 0, 0, 0,
  ]);

  const [playerBoard, updatePlayerBoard] = useState(Array(100).fill(0b0000));

  // function logBoard() {
  //   for (let i = 0; i <= 99; i++) {
  //     if (board[i] < 0) {
  //       console.log(
  //         "At postion " + (i + 1) + " snake to " + (Math.abs(board[i]) + 1)
  //       );
  //     } else if (board[i] > 0) {
  //       console.log("At postion " + (i + 1) + " ladder to " + (board[i] + 1));
  //     }
  //   }
  // }

  function placePlayers(curPLayerPositions) {
    let newBoard = Array(100).fill(0b000);
    if (curPLayerPositions[0] != null) {
      newBoard[curPLayerPositions[0]] |= 0b1000;
    }

    if (curPLayerPositions[1] != null) {
      newBoard[curPLayerPositions[1]] |= 0b0100;
    }

    if (curPLayerPositions[2] != null) {
      newBoard[curPLayerPositions[2]] |= 0b0010;
    }

    if (curPLayerPositions[3] != null) {
      newBoard[curPLayerPositions[3]] |= 0b0001;
    }
    updatePlayerBoard(newBoard);
  }
  function createPlayers(pCount) {
    switch (pCount) {
      case 1: //useless condition as minimum player count will always be 2
        updatePlayerPositions([0, null, null, null]);
        placePlayers([0, null, null, null]);
        break;

      case 2:
        updatePlayerPositions([0, 0, null, null]);
        placePlayers([0, 0, null, null]);
        break;

      case 3:
        updatePlayerPositions([0, 0, 0, null]);
        placePlayers([0, 0, 0, null]);
        break;

      case 4:
        updatePlayerPositions([0, 0, 0, 0]);
        placePlayers([0, 0, 0, 0]);
        break;
    }
  }

  //AI generated start
  async function rollDice() {
    updateMessage("Rolling Dice...");
    await new Promise((resolve) => setTimeout(resolve, 300));
    playSoundOf("spacebar", soundStatus);
    const result = Math.floor(Math.random() * 6) + 1;
    const diceImageElement = document.getElementById("dice-img");
    diceImageElement.src = `../../dice-icons/${result}.png`;
    return result;
  }
  //AI generated end

  async function movePlayer(player, moves) {
    let newPos = [...playerPostions];
    for (let i = 0; i < moves; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      newPos[player]++;
      updatePlayerPositions(newPos);
      placePlayers(newPos);
      playSoundOf("piece", soundStatus);
    }
    return newPos[player];
  }

  async function jumpPlayer(currentPlayer, newPlace) {
    if (board[newPlace] != 0) {
      // executing the snake/ladder movement with some delay to help user follow along
      await new Promise((resolve) => setTimeout(resolve, 800));
      const whereTo = board[newPlace];
      if (whereTo > 0) {
        playSoundOf("ladder", soundStatus);
      } else {
        playSoundOf("snake", soundStatus);
      }
      const jumpTo = Math.abs(whereTo);
      const newPlayerPositions = playerPostions;
      newPlayerPositions[currentPlayer] = jumpTo;
      updatePlayerPositions(newPlayerPositions);
      placePlayers(newPlayerPositions);

      //Slightly long code for that one ladder that takes you to victory:

      if (jumpTo == 99) {
        const newMsg = "Player " + (currentPlayer + 1) + " won the game!";
        updateMessage(newMsg);
        setWinner(currentPlayer);
        return;
      }

      return board[newPlace];
    }
  }

  async function gameLoop() {
    if (winner > -1) return;

    const moves = await rollDice(); // rolling dice

    const newMsg = "P" + (currentPlayer + 1) + " 🎲 " + moves;
    updateMessage(newMsg);

    // validty check when players are near the end
    if (playerPostions[currentPlayer] + moves > 99) {
      const newMsg = "Rolled extra(" + moves + ") can't move";
      updateMessage(newMsg);
      // updatePrevPlayer(currentPlayer);
      updateCurrentPlayer((currentPlayer + 1) % playerCount);
      return;
    }

    // moving player if they fulfill valid condition
    const oldPLace = playerPostions[currentPlayer];
    const newPlace = await movePlayer(currentPlayer, moves);

    if (newPlace == 99) {
      const newMsg = "Player " + (currentPlayer + 1) + " won the game!";
      updateMessage(newMsg);
      setWinner(currentPlayer);
      playSoundOf("game-win", soundStatus);
      return;
    }

    const newMsg2 =
      "P" +
      (currentPlayer + 1) +
      " 🎲 " +
      moves +
      " , " +
      (oldPLace + 1) +
      " ➡️ " +
      (newPlace + 1) +
      " ";

    updateMessage(newMsg2);

    const thisPlayer = currentPlayer;
    updateCurrentPlayer((currentPlayer + 1) % playerCount);

    let jumpPos;
    jumpPos = await jumpPlayer(thisPlayer, newPlace);
    let absJumpPos = Math.abs(jumpPos);
    let finalMsg = newMsg2;

    if (jumpPos > 0) finalMsg = finalMsg + " 🪜 " + (absJumpPos + 1);
    else if (jumpPos < 0) finalMsg = finalMsg + " 🐍 " + (absJumpPos + 1);

    updateMessage(finalMsg);
  }

  async function resetGame() {
    updateMessage("Waiting for Dice Roll...");
    updateCurrentPlayer(0);
    updatePlayerPositions(Array(6).fill(null));
    updatePlayerBoard(Array(100).fill(0b000));
    setWinner(-1);
    playSoundOf("game-reset", soundStatus);
    setPlayerCount(0);
  }

  async function callGameLoop() {
    if (isRolling) return;
    setIsRolling(true);
    await gameLoop();
    setIsRolling(false);
  }

  if (playerCount == 0) {
    return (
      <div className="fancySL">
        <SelectPlayers
          onSubmit={setPlayerCount}
          createPly={createPlayers}
        ></SelectPlayers>
      </div>
    );
  } else {
    return (
      <div className="fancySL">
        <div>
          <div className="messageBox">
            <div> {message}</div>
          </div>
        </div>

        <div className="slboard">
          {Array(10)
            .fill()
            .map((item2, rowIndex) => (
              <div key={rowIndex} className="row">
                {Array(10)
                  .fill()
                  .map((item, colIndex) =>
                    rowIndex % 2 == 0 ? (
                      <PlayerTile
                        key={colIndex}
                        tileString={playerBoard[99 - (rowIndex * 10 + colIndex)]}
                      />
                    ) : (
                      <PlayerTile
                        key={colIndex}
                        tileString={playerBoard[99 - (rowIndex * 10 + 9 - colIndex)]}
                      />
                    )
                  )}
              </div>
            ))}
        </div>

        <div className="bottom-controls">
          <div className="reset-game-button">
            <ResetButton
              src={"../../images/restart icon.png"}
              alt={"reset"}
              onClick={() => resetGame()}
            />
          </div>
          <div className="diceBox">
            <PlayerDisplay curPlayer={currentPlayer} />
            <button
              className="flex items-center justify-center"
              onClick={() => callGameLoop()}
            >
              <img src="../images/dice-icon.png" alt="" id="dice-img" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
