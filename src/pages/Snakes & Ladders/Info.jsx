import { ScrollShadow } from "@nextui-org/react";
import React from "react";
import "./info.css";
const SnakesLaddersInfo = () => {
  return (
    <ScrollShadow className="h-full w-full px-6 pb-6">
      <div className="info-box">
        <ol>
          <li>
            <span>
              1. Select required number of players and click "Submit" to start
              the game.
            </span>
            <img src="../../../public/info-images/snl-info-1.png" alt="" />
          </li>
          <li>
            <span>
              2. The image on the left of the dice indicates whose turn it is.
            </span>
            <img src="../../../public/info-images/snl-info-2.png" alt="" />
          </li>
          <li>
            <span>
              3. Click on the dice icon to roll it. The image displayed is the
              amount rolled
            </span>
            <img src="../../../public/info-images/snl-info-3.png" alt="" />
          </li>
          <li>
            <span>
              4. Press the reset button on the left below the board to reset the
              game.
            </span>
            <img src="../../../public/info-images/snl-info-4.png" alt="" />
          </li>
          <li>
            <span>
              5. Landing on a ladder tile will take you ahead on the board to a
              new tile.
            </span>
            <img src="../../../public/info-images/snl-info-5.png" alt="" />
          </li>
          <li>
            <span>
              6. Landing on a snake tile will take you back on the board to a
              new tile.
            </span>
            <img src="../../../public/info-images/snl-info-6.png" alt="" />
          </li>
          <li>
            <span>
              7. The first player to reach the last tile wins the game.
            </span>
            <img src="../../../public/info-images/snl-info-7.png" alt="" />
          </li>
        </ol>
      </div>
    </ScrollShadow>
  );
};

export default SnakesLaddersInfo;
