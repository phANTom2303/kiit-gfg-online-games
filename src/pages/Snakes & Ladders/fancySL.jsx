import { useState } from "react";
import SelectPlayers from "./SelectPlayers/selectPlayer";
import PlayerDisplay from "./playerDisplay.jsx";
import ResetButton from "./resetButton/resetButton.jsx";
import PlayerTile from "./players/playerTile.jsx";
import "./fancySL.css";
function FancySL() {
  const [playerCount, setPlayerCount] = useState(0);
  const [playerPostions, updatePlayerPositions] = useState(Array(4).fill(null));
  const [message, updateMessage] = useState("Waiting for Dice Roll...");
  const [currentPlayer, updateCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState(-1);

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
  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
  //AI generated end

  async function movePlayer(player, moves) {
    let newPos = [...playerPostions];
    for (let i = 0; i < moves; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      newPos[player]++;
      updatePlayerPositions(newPos);
      placePlayers(newPos);
    }
    return newPos[player];
  }

  function jumpPlayer(currentPlayer, newPlace) {
    if (board[newPlace] != 0) {
      const jumpTo = Math.abs(board[newPlace]);
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

    const moves = rollDice(); // rolling dice

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
    // updatePrevPlayer(thisPlayer);
    updateCurrentPlayer((currentPlayer + 1) % playerCount);

    let jumpPos;
    // executing the snake/ladder movement with some delay to help user follow along
    await new Promise((resolve) => setTimeout(resolve, 800));
    jumpPos = jumpPlayer(thisPlayer, newPlace);
    let absJumpPos = Math.abs(jumpPos);
    let finalMsg = newMsg2;

    if (jumpPos > 0) finalMsg = finalMsg + " 🪜 " + (absJumpPos + 1);
    else if (jumpPos < 0) finalMsg = finalMsg + " 🐍 " + (absJumpPos + 1);

    updateMessage(finalMsg);
  }

  function resetGame() {
    updateMessage("Waiting for Dice Roll...");
    updateCurrentPlayer(0);
    updatePlayerPositions(Array(6).fill(null));
    setPlayerCount(0);
    setWinner(-1);
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
          <div className="row">
            <PlayerTile tileString={playerBoard[99]} />
            <PlayerTile tileString={playerBoard[98]} />
            <PlayerTile tileString={playerBoard[97]} />
            <PlayerTile tileString={playerBoard[96]} />
            <PlayerTile tileString={playerBoard[95]} />
            <PlayerTile tileString={playerBoard[94]} />
            <PlayerTile tileString={playerBoard[93]} />
            <PlayerTile tileString={playerBoard[92]} />
            <PlayerTile tileString={playerBoard[91]} />
            <PlayerTile tileString={playerBoard[90]} />
          </div>
          <div className="row">
            <PlayerTile tileString={playerBoard[80]} />
            <PlayerTile tileString={playerBoard[81]} />
            <PlayerTile tileString={playerBoard[82]} />
            <PlayerTile tileString={playerBoard[83]} />
            <PlayerTile tileString={playerBoard[84]} />
            <PlayerTile tileString={playerBoard[85]} />
            <PlayerTile tileString={playerBoard[86]} />
            <PlayerTile tileString={playerBoard[87]} />
            <PlayerTile tileString={playerBoard[88]} />
            <PlayerTile tileString={playerBoard[89]} />
          </div>
          <div className="row">
            <PlayerTile tileString={playerBoard[79]} />
            <PlayerTile tileString={playerBoard[78]} />
            <PlayerTile tileString={playerBoard[77]} />
            <PlayerTile tileString={playerBoard[76]} />
            <PlayerTile tileString={playerBoard[75]} />
            <PlayerTile tileString={playerBoard[74]} />
            <PlayerTile tileString={playerBoard[73]} />
            <PlayerTile tileString={playerBoard[72]} />
            <PlayerTile tileString={playerBoard[71]} />
            <PlayerTile tileString={playerBoard[70]} />
          </div>
          <div className="row">
            <PlayerTile tileString={playerBoard[60]} />
            <PlayerTile tileString={playerBoard[61]} />
            <PlayerTile tileString={playerBoard[62]} />
            <PlayerTile tileString={playerBoard[63]} />
            <PlayerTile tileString={playerBoard[64]} />
            <PlayerTile tileString={playerBoard[65]} />
            <PlayerTile tileString={playerBoard[66]} />
            <PlayerTile tileString={playerBoard[67]} />
            <PlayerTile tileString={playerBoard[68]} />
            <PlayerTile tileString={playerBoard[69]} />
          </div>
          <div className="row">
            <PlayerTile tileString={playerBoard[59]} />
            <PlayerTile tileString={playerBoard[58]} />
            <PlayerTile tileString={playerBoard[57]} />
            <PlayerTile tileString={playerBoard[56]} />
            <PlayerTile tileString={playerBoard[55]} />
            <PlayerTile tileString={playerBoard[54]} />
            <PlayerTile tileString={playerBoard[53]} />
            <PlayerTile tileString={playerBoard[52]} />
            <PlayerTile tileString={playerBoard[51]} />
            <PlayerTile tileString={playerBoard[50]} />
          </div>
          <div className="row">
            <PlayerTile tileString={playerBoard[40]} />
            <PlayerTile tileString={playerBoard[41]} />
            <PlayerTile tileString={playerBoard[42]} />
            <PlayerTile tileString={playerBoard[43]} />
            <PlayerTile tileString={playerBoard[44]} />
            <PlayerTile tileString={playerBoard[45]} />
            <PlayerTile tileString={playerBoard[46]} />
            <PlayerTile tileString={playerBoard[47]} />
            <PlayerTile tileString={playerBoard[48]} />
            <PlayerTile tileString={playerBoard[49]} />
          </div>
          <div className="row">
            <PlayerTile tileString={playerBoard[39]} />
            <PlayerTile tileString={playerBoard[38]} />
            <PlayerTile tileString={playerBoard[37]} />
            <PlayerTile tileString={playerBoard[36]} />
            <PlayerTile tileString={playerBoard[35]} />
            <PlayerTile tileString={playerBoard[34]} />
            <PlayerTile tileString={playerBoard[33]} />
            <PlayerTile tileString={playerBoard[32]} />
            <PlayerTile tileString={playerBoard[31]} />
            <PlayerTile tileString={playerBoard[30]} />
          </div>
          <div className="row">
            <PlayerTile tileString={playerBoard[20]} />
            <PlayerTile tileString={playerBoard[21]} />
            <PlayerTile tileString={playerBoard[22]} />
            <PlayerTile tileString={playerBoard[23]} />
            <PlayerTile tileString={playerBoard[24]} />
            <PlayerTile tileString={playerBoard[25]} />
            <PlayerTile tileString={playerBoard[26]} />
            <PlayerTile tileString={playerBoard[27]} />
            <PlayerTile tileString={playerBoard[28]} />
            <PlayerTile tileString={playerBoard[29]} />
          </div>
          <div className="row">
            <PlayerTile tileString={playerBoard[19]} />
            <PlayerTile tileString={playerBoard[18]} />
            <PlayerTile tileString={playerBoard[17]} />
            <PlayerTile tileString={playerBoard[16]} />
            <PlayerTile tileString={playerBoard[15]} />
            <PlayerTile tileString={playerBoard[14]} />
            <PlayerTile tileString={playerBoard[13]} />
            <PlayerTile tileString={playerBoard[12]} />
            <PlayerTile tileString={playerBoard[11]} />
            <PlayerTile tileString={playerBoard[10]} />
          </div>
          <div className="row">
            <PlayerTile tileString={playerBoard[0]} />
            <PlayerTile tileString={playerBoard[1]} />
            <PlayerTile tileString={playerBoard[2]} />
            <PlayerTile tileString={playerBoard[3]} />
            <PlayerTile tileString={playerBoard[4]} />
            <PlayerTile tileString={playerBoard[5]} />
            <PlayerTile tileString={playerBoard[6]} />
            <PlayerTile tileString={playerBoard[7]} />
            <PlayerTile tileString={playerBoard[8]} />
            <PlayerTile tileString={playerBoard[9]} />
          </div>
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
            <button onClick={() => gameLoop()}>
              <img src="../public/images/dice-icon.png" alt="" />
            </button>
          </div>
        </div>

        {/* <button onClick={() => resetGame()}>Reset</button> */}
      </div>
    );
  }
}
export default FancySL;
