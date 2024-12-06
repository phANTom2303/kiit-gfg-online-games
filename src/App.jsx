import TicTacToe from "./pages/tictactoe/tictactoe";
import Header from "./components/header/header";
import GameCard from "./components/gameCard/GameCard";
import Connect4 from "./pages/connect4/connect4";
import SnakeAndLadders from "./pages/Snakes & Ladders/snake-and-ladders";
import playSoundOf from "./components/soundHandler";
import ChainReaction from "./pages/chain-reaction/ChainReaction";
import Hangman from "./pages/hangman/Main";
import AboutPage from "./pages/about-page/about";
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
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center bg-[url('/images/background.png')] bg-repeat bg-contain bg-center"></div>
        </div>
        <div className="overflow-x-hidden antialiased mt-[100px]">
          <Header
            text={"Tic Tac Toe"}
            onImgClick={() => setChoice(0)}
            withMuteButton={true}
            soundStatus={soundStatus}
            updateSoundStatus={updateSoundStatus}
            onlyBackButton={false}
          />
          <TicTacToe soundStatus={soundStatus} />
        </div>
      </>
    );
  } else if (choice == 2) {
    return (
      <>
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center bg-[url('/images/background.png')] bg-repeat bg-contain bg-center"></div>
        </div>
        <div className="overflow-x-hidden antialiased mt-[100px]">
          <Header
            text={"Connect 4"}
            onImgClick={() => setChoice(0)}
            withMuteButton={true}
            soundStatus={soundStatus}
            updateSoundStatus={updateSoundStatus}
            onlyBackButton={false}
          />
          <Connect4 soundStatus={soundStatus} />
        </div>
      </>
    );
  } else if (choice == 3) {
    return (
      <>
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center bg-[url('/images/background.png')] bg-repeat bg-contain bg-center"></div>
        </div>
        <div className="overflow-x-hidden antialiased mt-[100px]">
          <Header
            text={"Snakes & Ladders"}
            onImgClick={() => setChoice(0)}
            withMuteButton={true}
            soundStatus={soundStatus}
            updateSoundStatus={updateSoundStatus}
            onlyBackButton={false}
          />
          <SnakeAndLadders soundStatus={soundStatus} />
        </div>
      </>
    );
  } else if (choice == 4) {
    return (
      <>
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center bg-[url('/images/background.png')] bg-repeat bg-contain bg-center"></div>
        </div>
        <div className="overflow-x-hidden antialiased mt-[100px]">
          <Header
            text={"Chain Reaction"}
            onImgClick={() => setChoice(0)}
            withMuteButton={false}
            soundStatus={soundStatus}
            updateSoundStatus={updateSoundStatus}
            onlyBackButton={true}
        />
          <ChainReaction />
        </div>
      </>
    );
  } else if (choice == 5) {
    return (
      <>
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center bg-[url('/images/background.png')] bg-repeat bg-contain bg-center"></div>
        </div>
        <div className="overflow-x-hidden antialiased mt-[100px]">
          <Header
            text={"Hangman"}
            onImgClick={() => setChoice(0)}
            withMuteButton={false}
            soundStatus={soundStatus}
            updateSoundStatus={updateSoundStatus}
            onlyBackButton={true}
        />
          <Hangman />
        </div>
      </>
    );
  } else if (choice == 6) {
    return (
      <>
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center bg-[url('/images/background.png')] bg-repeat bg-contain bg-center"></div>
        </div>
        <div className="overflow-x-hidden antialiased mt-[100px]">
          <Header
            text={"About Us"}
            onImgClick={() => setChoice(0)}
            withMuteButton={false}
            soundStatus={soundStatus}
            updateSoundStatus={updateSoundStatus}
            onlyBackButton={true}
        />
          <AboutPage />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center bg-[url('/images/background.png')] bg-repeat bg-contain bg-center"></div>
        </div>
        <div className="overflow-x-hidden antialiased mt-[100px]">
          <Header text={"Mini Games"} onImgClick={() => setChoice(0)} />
          <div className="cardList pb-[30px]">
            <GameCard
              onCardClick={() => updateChoice(3)}
              gameName={"Snakes & Ladders"}
              imgPath={"../../images/banners/snake-and-ladders-banner.jpg"}
              playerCount={6}
              gameDuration={"30 min."}
            />
            <GameCard
              onCardClick={() => setChoice(4)}
              gameName={"Chain Reaction"}
              imgPath={"../../images/banners/chain-reaction.png"}
              playerCount={4}
              gameDuration={"15 min."}
            />
            <GameCard
              onCardClick={() => setChoice(5)}
              gameName={"Hangman"}
              imgPath={"../../images/banners/hang.webp"}
              playerCount={1}
              gameDuration={"2 min."}
            />
            <GameCard
              onCardClick={() => setChoice(1)}
              imgPath={"../../images/banners/tictactoe-banner.png"}
              gameName={"Tic Tac Toe"}
              playerCount={2}
              gameDuration={"1 min."}
            />
            <GameCard
              onCardClick={() => setChoice(2)}
              gameName={"Connect 4"}
              imgPath={"../../images/banners/connect 4 banner.jpg"}
              playerCount={2}
              gameDuration={"15 min."}
            />

            <GameCard
              onCardClick={() => setChoice(6)}
              gameName={"About Page"}
              imgPath={"../../images/banners/gfg-logo.png"}
              playerCount={"Many"}
              gameDuration={"A lot"}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
