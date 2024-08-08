import React, { useState } from 'react';
import './styles.css';
import Header from './Header';
import Search from './Search';
import GamesGrid from './GamesGrid';

function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories(prevCategories => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter(cat => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handleCardClick = (url) => {
    window.location.href = url;
  };

  return (
    <div id="app">
      <Header />
      <main>
        <Search toggleCategory={toggleCategory} />
        <GamesGrid selectedCategories={selectedCategories} onCardClick={handleCardClick} />
      </main>
    </div>
  );
}

export default App;
