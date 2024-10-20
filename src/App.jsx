import TicTacToe from "./pages/tictactoe/tictactoe";
import Header from "./components/header/header";
import GameCard from "./components/gameCard/GameCard";
import Connect4 from "./pages/connect4/connect4";
import SnakeAndLadders from "./pages/Snakes & Ladders/snake-and-ladders";
import playSoundOf from "./components/soundHandler";
import { useState } from "react";
function App() {
  const [choice, setChoice] = useState(0);
  const [soundStatus, updateSoundStatus] = useState(true);

  function updateChoice(choice) {
    playSoundOf("game-start", soundStatus);
    setChoice(choice);
  }
  if (choice == 1) {
    return (
      <>
        <Header
          text={"Tic Tac Toe"}
          onImgClick={() => setChoice(0)}
          backButton={true}
          soundStatus={soundStatus}
          updateSoundStatus={updateSoundStatus}
        />
        <TicTacToe soundStatus={soundStatus} />
      </>
    );
  } else if (choice == 2) {
    return (
      <>
        <Header
          text={"Connect 4"}
          onImgClick={() => setChoice(0)}
          backButton={true}
          soundStatus={soundStatus}
          updateSoundStatus={updateSoundStatus}
        />
        <Connect4 soundStatus={soundStatus} />
      </>
    );
  } else if (choice == 3) {
    return (
      <>
        <Header
          text={"Snakes & Ladders"}
          onImgClick={() => setChoice(0)}
          backButton={true}
          soundStatus={soundStatus}
          updateSoundStatus={updateSoundStatus}
        />
        <SnakeAndLadders soundStatus={soundStatus} />
      </>
    );
  } else {
    return (
      <>
        <Header
          text={"Mini Games"}
          onImgClick={() => setChoice(0)}
          backButton={false}
        />
        <div className="cardList">
          <GameCard
            onCardClick={() => updateChoice(1)}
            imgPath={"../../images/banners/tictactoe-banner.png"}
            gameName={"Tic Tac Toe"}
            playerCount={2}
            gameDuration={"1 min."}
          />
          <GameCard
            onCardClick={() => updateChoice(2)}
            gameName={"Connect 4"}
            imgPath={"../../images/banners/connect 4 banner.jpg"}
            playerCount={2}
            gameDuration={"15 min."}
          />
          <GameCard
            onCardClick={() => updateChoice(3)}
            gameName={"Snakes & Ladders"}
            imgPath={"../../images/banners/snake-and-ladders-banner.jpg"}
            playerCount={6}
            gameDuration={"30 min."}
          />
          <GameCard
            gameName={"Battleship"}
            imgPath={"../../images/banners/battleship banner.jpg"}
            playerCount={2}
            gameDuration={"20 min."}
          />

          <GameCard
            gameName={"Ludo"}
            imgPath={"../../images/banners/ludo banner-cropped.jpg"}
            playerCount={4}
            gameDuration={"45 min."}
          />

          <GameCard
            gameName={"Game Name"}
            imgPath={"../../images/banners/placeholderbanner2.jpg"}
            playerCount={4}
            gameDuration={"5 min."}
          />

          <GameCard
            gameName={"Game Name"}
            imgPath={"../../images/banners/placeHolderBanner.png"}
            playerCount={4}
            gameDuration={"5 min."}
          />
          <GameCard
            gameName={"Game Name"}
            imgPath={"../../images/banners/placeHolderBanner3.jpg"}
            playerCount={4}
            gameDuration={"5 min."}
          />
          <GameCard
            gameName={"Game Name"}
            imgPath={"../../images/banners/placeholderbanner2.jpg"}
            playerCount={4}
            gameDuration={"5 min."}
          />
          <GameCard
            gameName={"Game Name"}
            imgPath={"../../images/banners/placeHolderBanner3.jpg"}
            playerCount={4}
            gameDuration={"5 min."}
          />

          <GameCard
            gameName={"Game Name"}
            imgPath={"../../images/banners/placeholder-banner.jpg"}
            playerCount={4}
            gameDuration={"5 min."}
          />
          <GameCard
            gameName={"Game Name"}
            imgPath={"../../images/banners/placeHolderBanner.png"}
            playerCount={4}
            gameDuration={"5 min."}
          />
        </div>
      </>
    );
  }
}

export default App;
