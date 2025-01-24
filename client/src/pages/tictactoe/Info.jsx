import React from "react";
import { ScrollShadow } from "@nextui-org/react";
import "./info.css";

const TicTacToeInfo = () => {
  return (
    <ScrollShadow className="h-full w-full px-6 pb-6">
      <div className="info-box">
        <ol>
          <li>
            <span>1. Click on an empty cell to place an 'X' or an 'O'</span>
            <img src="../../../info-images/tictactoe-info-1.png" alt="" />
          </li>

          <li>
            <span>
              2. Place three of the same in a row, column, or diagonal to win.
            </span>
            <img src="../../../info-images/tictactoe-info-2.png" alt="" />
          </li>
        </ol>
      </div>
    </ScrollShadow>
  );
};

export default TicTacToeInfo;
