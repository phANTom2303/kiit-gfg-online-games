import React from 'react';

const games = [
  { url: "Game_Pages/ludo.html", img: "/img/game cards/game.png", title: "LUDO", players: "4 Player", time: "~30 mins" },
  { img: "/img/game cards/tik_tac_toe.png", title: "TIK TAC TOE", players: "2 Player", time: "~1 mins" },
  { img: "/img/game cards/connect4.png", title: "Connect 4", players: "2 Player", time: "~10 mins" },
  { img: "/img/game cards/snake_and_ladder.png", title: "Snakes And Ladders", players: "4 Player", time: "~15 mins" },
  { img: "/img/game cards/battleship.png", title: "Battleship", players: "2 Player", time: "~30 mins" },
  { img: "/img/game cards/uno.png", title: "UNO", players: "4 Player", time: "~30 mins" },
  { img: "/img/game cards/card.png", title: "Card", players: "4 Player", time: "~30 mins" },
  { img: "/img/game cards/chess.png", title: "Chess", players: "2 Player", time: "~20 mins" },
];

function GamesGrid({ onCardClick }) {
  return (
    <div className="games-grid">
      {games.map((game, index) => (
        <div className="game-card" key={index} onClick={() => onCardClick(game.url)}>
          <img src={game.img} alt={game.title} />
          <div className="game-info">
            <h2>{game.title}</h2>
            <div className="details">
              <div className="game-logo">
                <img src="/img/player.png" alt="Player Count" />
              </div>
              <p>{game.players}</p>
              <div className="game-logo">
                <img src="/img/clock.png" alt="Avg Time" />
              </div>
              <p>{game.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GamesGrid;
