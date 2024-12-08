import "./header.css";
import MuteButton from "../muteButton";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import ChainReactionInfo from "../../pages/chain-reaction/Info";
import TicTacToeInfo from "../../pages/tictactoe/Info";
import Connect4Info from "../../pages/connect4/Info";
import SnakeAndLaddersInfo from "../../pages/Snakes & Ladders/Info";
import HangmanInfo from "../../pages/hangman/Info";

const infos = [
  <TicTacToeInfo />,
  <Connect4Info />,
  <SnakeAndLaddersInfo />,
  <ChainReactionInfo />,
  <HangmanInfo />,
];

function Header({
  text,
  onImgClick,
  withMuteButton,
  soundStatus,
  updateSoundStatus,
  onlyBackButton,
  game,
}) {
  const [popUp, setPopUp] = useState(false);

  return (
    <>
      {popUp && (
        <div className="fixed top-0 z-40 h-full w-full">
          <div className="absolute inset-0 z-10 h-full w-full items-center flex justify-center bg-[#000000]/40">
            <div className="h-[80%] w-[85%] max-w-[800px] bg-blue-500 rounded-3xl flex flex-col items-center justify-start shadow-lg shadow-blue-700 overflow-hidden">
              <div className="flex items-center justify-end pt-2 w-full px-3">
                <IoClose
                  className="text-5xl text-[#1b1a55] cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 hover:rotate-90"
                  onClick={() => setPopUp(false)}
                ></IoClose>
              </div>
              <div className="w-full pb-6 overflow-auto">{infos[game - 1]}</div>
            </div>
          </div>
        </div>
      )}
      <div>
        {onlyBackButton ? (
          <div className="header fixed w-full z-10 top-0">
            <img
              src="../../images/online game logo.png"
              alt=""
              onClick={onImgClick}
            />
            <h1 className="title">{text}</h1>
            <ul>
              <li style={{ cursor: "pointer" }} onClick={onImgClick}>
                <img
                  src="../../header-icons/back-arrow.png"
                  // style={{ height: "3vw", width: "3vw" }}
                  alt="Go Back"
                  className="header-icon"
                />
              </li>
              {game != 6 && (
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => setPopUp(true)}
                >
                  <img
                    src="../../header-icons/info-icon.png"
                    // style={{ height: "3vw", width: "3vw" }}
                    alt="Info"
                    className="header-icon"
                  />
                </li>
              )}
            </ul>
          </div>
        ) : withMuteButton ? (
          <div className="header fixed w-full z-10 top-0">
            <img
              src="../../images/online game logo.png"
              alt=""
              onClick={onImgClick}
            />
            <h1 className="title">{text}</h1>
            <ul>
              <li style={{ cursor: "pointer" }} onClick={onImgClick}>
                <img
                  src="../../header-icons/back-arrow.png"
                  // style={{ height: "3vw", width: "3vw" }}
                  alt="Go Back"
                  className="header-icon"
                />
              </li>
              <li
                style={{ cursor: "pointer" }}
                onClick={() => updateSoundStatus(!soundStatus)}
              >
                <MuteButton soundStatus={soundStatus} className="header-icon" />
              </li>
              {game != 6 && (
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => setPopUp(true)}
                >
                  <img
                    src="../../header-icons/info-icon.png"
                    // style={{ height: "3vw", width: "3vw" }}
                    alt="Info"
                    className="header-icon"
                  />
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div className="header fixed w-full z-10 top-0">
            <img
              src="../../images/online game logo.png"
              alt=""
              onClick={onImgClick}
              className="header-icon"
            />
            <h1 className="title">{text}</h1>
          </div>
        )}
      </div>
    </>
  );
}
export default Header;
