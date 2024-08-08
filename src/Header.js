import React from 'react';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/img/logo.png" alt="Logo" />
        <a href="index.html">
          <span>ONLINE GAME</span>
        </a>
      </div>
      <nav>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Feedback</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
