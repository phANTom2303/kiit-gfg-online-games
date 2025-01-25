import React from 'react';
import Hangman from './Hangman1';
import HangmanDraw from './HangmanDrawing';

export const ContentGraphics = ({ noOfWrong, answer, updateNoOfWrong, reset, category }) => {
  return (
    <main className="flex flex-col sm:flex-row flex-1 overflow-hidden bg-gray-100">
      {/* Drawing Part */}
      <div className="w-full sm:w-1/3 bg-blue-300 p-8 flex items-center justify-center shadow-md">
        <HangmanDraw numberOfGuess={noOfWrong} />
      </div>

      {/* Game Content */}
      <div className="flex-grow bg-blue-600 p-4 flex flex-col items-center justify-center shadow-md">
        <Hangman
          noOfWrong={noOfWrong}
          answer={answer}
          updateNoOfWrong={updateNoOfWrong}
          reset={reset}
          category={category}
        />
      </div>
    </main>
  );
};
