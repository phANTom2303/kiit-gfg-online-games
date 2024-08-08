import React from 'react';

function Search({ toggleCategory }) {
  const categories = ["New", "Multiplayer", "Adventure", "10 Min Play", "20 Min Play", "4 Player"];

  return (
    <div className="search">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>
          <img src="/img/search.png" alt="Search" />
        </button>
      </div>
      <div className="categories">
        {categories.map(category => (
          <button key={category} onClick={() => toggleCategory(category)}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Search;
