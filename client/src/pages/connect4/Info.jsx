import React from "react";
import { ScrollShadow } from "@nextui-org/react";
import "./info.css"

const Connect4Info = () => {
  return <ScrollShadow className="h-full w-full px-6 pb-6">
    <div className="info-box">
        <ol>
          <li>
            <span>
              1. Click on a vacant column to "drop" a coin.
            </span>
            <img src="../../../info-images/c4-info-1.png" alt="" />
          </li>

          <li>
            <span>
              2. Each coin will fall to the lowest empty space in the selected column.
            </span>
            <img src="../../../info-images/c4-info-2.png" alt="" />
          </li>

          <li>
            <span>
              3. The First person to obtain 4 consecutive coins horizontally, vertically or diagonally wins the game.
            </span>
            <img src="../../../info-images/c4-info-3.png" alt="" />
          </li>
          
        </ol>
      </div>
  </ScrollShadow>;
};

export default Connect4Info;
