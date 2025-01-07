import React from "react";
import { ScrollShadow } from "@nextui-org/react";

const HangmanInfo = () => {
  return (
    <ScrollShadow className="h-full w-full px-6 pb-6">
      <div className="info-box">
        <ol>
          <li>
            <span>
              1. The objective of the game is to guess a word. The blank spaces
              indicate no. of letters. There is a hint at the top to help you.
            </span>
            <img src="../../../info-images/hangman-info-1.png" alt="" />
          </li>

          <li>
            <span>
              2. Correctly guessed letters will occupy the blank spaces.
            </span>
            <img src="../../../info-images/hangman-info-2.png" alt="" />
          </li>

          <li>
            <span>3. Incorrect Guesses will draw the hangman on the left.</span>
            <img src="../../../info-images/hangman-info-3.png" alt="" />
          </li>

          <li>
            <span>
              4. Too many incorrect guesses will complete the hangman, and you
              lose.
            </span>
            <img src="../../../info-images/hangman-info-4.png" alt="" />
          </li>

          
        </ol>
      </div>
    </ScrollShadow>
  );
};

export default HangmanInfo;
