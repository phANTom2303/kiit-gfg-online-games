import React, { useState, useEffect } from 'react';
import { Footer } from './Footer';
import { ContentGraphics } from './MiddlePart';
import { randomWord } from './RandomWords';

function Main() {
  const [noOfWrong, setNoOfWrong] = useState(0);
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');

  const reset = () => {
    setNoOfWrong(0);
    try {
      const newWord = randomWord();
      setAnswer(newWord.word);
      setCategory(newWord.category);
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  useEffect(() => {
    reset(); 
  }, []); 

  const updateNoOfWrong = (newCount) => {
    setNoOfWrong(newCount);
  };

  return (
    <div className="flex flex-col h-screen">
      
      <main className="flex-grow flex flex-col sm:flex-row">
        <ContentGraphics
          noOfWrong={noOfWrong}
          answer={answer}
          updateNoOfWrong={updateNoOfWrong}
          reset={reset}
          category={category}
        />
      </main>
      <Footer reset={reset} />
    </div>
  );
}

export default Main;
