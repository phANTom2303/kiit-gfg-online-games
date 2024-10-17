import "./connect4.css";
import C4tile from "./C4tile";
import { useState } from "react";
import ResetButton from "./resetButton/resetButton";
function Connect4() {
  const [tiles, setTile] = useState(Array(7).fill(Array(6).fill(null)));
  const [player, setPlayer] = useState(1);
  const [message, setMessage] = useState("Turn of Red");
  const [winner, declareWinner] = useState(0);

  function row_freq(row, col, player) {
    let count = 1;
    for (
      let i = col + 1;
      i < 7;
      i++ // count to the right of the player
    ) {
      if (tiles[row][i] != player) break;
      count += 1;
    }

    for (
      let i = col - 1;
      i >= 0;
      i-- // counting to the left of player
    ) {
      if (tiles[row][i] != player) break;
      count += 1;
    }
    return count;
  }

  function col_freq(row, col, player) {
    let count = 1;
    for (
      let i = row + 1;
      i < 6;
      i++ // count below the player
    ) {
      if (tiles[i][col] != player) break;
      count += 1;
    }

    for (
      let i = row - 1;
      i >= 0;
      i-- // counting above the player
    ) {
      if (tiles[i][col] != player) break;
      count += 1;
    }
    return count;
  }

  function left_diagonal_freq(row, col, player) {
    if ((row >= 3 && col <= 2) || (row <= 2 && col >= 4)) return 0;

    let count = 1;
    let i = row + 1;
    let j = col + 1;
    while (i < 6 && j < 7) {
      // counting in bottom right direction
      if (tiles[i][j] == player) {
        count += 1;
        i++;
        j++;
      } else break;
    }

    i = row - 1;
    j = col - 1;

    while (i >= 0 && j >= 0) {
      // counting in top left direction
      if (tiles[i][j] == player) {
        count += 1;
        i--;
        j--;
      } else break;
    }
    return count;
  }

  function right_diagonal_freq(row, col, player) {
    if ((row <= 2 && col <= 2) || (row >= 3 && col >= 4)) return 0;

    let count = 1;
    let i = row + 1;
    let j = col - 1;

    while (i < 6 && j >= 0) {
      // counting in bottom left direction
      if (tiles[i][j] == player) {
        count += 1;
        i++;
        j--;
      } else break;
    }

    i = row - 1;
    j = col + 1;

    while (i >= 0 && j < 7) {
      // counting in top right direction
      if (tiles[i][j] == player) {
        count += 1;
        i--;
        j++;
      } else break;
    }

    return count;
  }

  function checkWin(row, col, player) {
    let row_count = row_freq(row, col, player);
    let col_count = col_freq(row, col, player);
    let left_diag_count = left_diagonal_freq(row, col, player);
    let right_diag_count = right_diagonal_freq(row, col, player);

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

  function onColumnClick(colNumber) {
    if (winner == 1) return;

    let position = null;
    for (let i = 5; i >= 0; i--) {
      if (tiles[i][colNumber] == null) {
        position = i;
        break;
      }
    }

    if (position == null) {
      setMessage("That Column is Full");
      return;
    }

    const nextTiles = JSON.parse(JSON.stringify(tiles));
    nextTiles[position][colNumber] = player;
    setTile(nextTiles);

    let result = checkWin(position, colNumber, player);

    if (result == true) {
      if (player == 1) setMessage("Red Won");
      else setMessage("Yellow Won");
      declareWinner(1);
      return;
    }

    if (player == -1) setMessage("Turn of Red");
    else setMessage("Turn of Yellow");
    setPlayer(player * -1);
  }

  function resetGame() {
    setTile(Array(7).fill(Array(6).fill(null)));
    setPlayer(1);
    setMessage("Turn of Red");
    declareWinner(0);
  }

  return (
    <div className="connect4 h-full">
      <div className="prompt-box">{message} </div>
      <div className="c4board">
        <div className="column" onClick={() => onColumnClick(0)}>
          <C4tile value={tiles[0][0]} />
          <C4tile value={tiles[1][0]} />
          <C4tile value={tiles[2][0]} />
          <C4tile value={tiles[3][0]} />
          <C4tile value={tiles[4][0]} />
          <C4tile value={tiles[5][0]} />
        </div>
        <div className="column" onClick={() => onColumnClick(1)}>
          <C4tile value={tiles[0][1]} />
          <C4tile value={tiles[1][1]} />
          <C4tile value={tiles[2][1]} />
          <C4tile value={tiles[3][1]} />
          <C4tile value={tiles[4][1]} />
          <C4tile value={tiles[5][1]} />
        </div>
        <div className="column" onClick={() => onColumnClick(2)}>
          <C4tile value={tiles[0][2]} />
          <C4tile value={tiles[1][2]} />
          <C4tile value={tiles[2][2]} />
          <C4tile value={tiles[3][2]} />
          <C4tile value={tiles[4][2]} />
          <C4tile value={tiles[5][2]} />
        </div>
        <div className="column" onClick={() => onColumnClick(3)}>
          <C4tile value={tiles[0][3]} />
          <C4tile value={tiles[1][3]} />
          <C4tile value={tiles[2][3]} />
          <C4tile value={tiles[3][3]} />
          <C4tile value={tiles[4][3]} />
          <C4tile value={tiles[5][3]} />
        </div>
        <div className="column" onClick={() => onColumnClick(4)}>
          <C4tile value={tiles[0][4]} />
          <C4tile value={tiles[1][4]} />
          <C4tile value={tiles[2][4]} />
          <C4tile value={tiles[3][4]} />
          <C4tile value={tiles[4][4]} />
          <C4tile value={tiles[5][4]} />
        </div>

        <div className="column" onClick={() => onColumnClick(5)}>
          <C4tile value={tiles[0][5]} />
          <C4tile value={tiles[1][5]} />
          <C4tile value={tiles[2][5]} />
          <C4tile value={tiles[3][5]} />
          <C4tile value={tiles[4][5]} />
          <C4tile value={tiles[5][5]} />
        </div>
        <div className="column" onClick={() => onColumnClick(6)}>
          <C4tile value={tiles[0][6]} />
          <C4tile value={tiles[1][6]} />
          <C4tile value={tiles[2][6]} />
          <C4tile value={tiles[3][6]} />
          <C4tile value={tiles[4][6]} />
          <C4tile value={tiles[5][6]} />
        </div>
      </div>
      <ResetButton
        src={"../../images/restart icon.png"}
        alt={"reset"}
        onClick={() => resetGame()}
      />
    </div>
  );
}
export default Connect4;
