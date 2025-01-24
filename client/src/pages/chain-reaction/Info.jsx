import React from "react";
import { ScrollShadow } from "@nextui-org/react";

import "./info.css";

const ChainReactionInfo = () => {
  return (
    <ScrollShadow className="h-full w-full px-6 pb-6">
      <div className="info-box">
        <ol>
          <li>
            <span>
              1. Type the number of players and click on the arrow button to
              begin the game.
            </span>
            <img src="../../../info-images/chain-info-1.png" alt="" />
          </li>
          <li>
            <span>
              2. The colour of the grid indicates which player's turn it is.
            </span>
            <img src="../../../info-images/chain-info-2.png" alt="" />
          </li>
          <li>
            <span>
              3. Click on a vacant cell to place a ball of your colour.
            </span>
            <img src="../../../info-images/chain-info-3.png" alt="" />
          </li>

          <li>
            <span>
              4. Each cell has a maximum capacity, after which, the balls will
              explode and spread to adjecent cells:
            </span>
          </li>
          <li>
            <span>
              4.1. Corner cells have a maximum capacity of 1.
            </span>
            <img src="../../../info-images/chain-info-4.png" alt="" />
            
            <img src="../../../info-images/chain-info-5.png" alt="" />
          </li>

          <li>
            <span>
              4.2. Edge cells have a maximum capacity of 2.
            </span>
            <img src="../../../info-images/chain-info-6.png" alt="" />
            
            <img src="../../../info-images/chain-info-7.png" alt="" />
          </li>

          <li>
            <span>
              4.3. Center cells have a maximum capacity of 3.
            </span>
            <img src="../../../info-images/chain-info-8.png" alt="" />
            
            <img src="../../../info-images/chain-info-9.png" alt="" />
          </li>

          <li>
            <span>
              5. If the neighboring cell is occupied by an opponent's ball, it will convert to the player's colour if a neighboring cell of the player explodes.
            </span>
            <img src="../../../info-images/chain-info-10.png" alt="" />
            
            <img src="../../../info-images/chain-info-11.png" alt="" />
          </li>

          <li>
            <span>
              6. Chain Reaction : If more than one adjecent cells are at maximum capacity, explosion in one of them spreads to all adjecent cells, hence the name chain reaction.  
            </span>
            <img src="../../../info-images/chain-info-12.png" alt="" />
            
            <img src="../../../info-images/chain-info-13.png" alt="" />
          </li>

          <li>
            <span>
              7. The game ends when all cells containing any balls are occupied by balls of a single player.
            </span>
            <img src="../../../info-images/chain-info-14.png" alt="" />
          </li>
        </ol>
      </div>
    </ScrollShadow>
  );
};

export default ChainReactionInfo;
