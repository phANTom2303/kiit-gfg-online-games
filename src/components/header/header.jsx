import "./header.css";
import MuteButton from "../muteButton";
function Header({
  text,
  onImgClick,
  withMuteButton,
  soundStatus,
  updateSoundStatus,
  onlyBackButton,
}) {
  if (onlyBackButton) {
    return (
      <div className="header fixed w-full z-50 top-0">
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
        </ul>
      </div>
    );

  } else if (withMuteButton) {
    return (
      <div className="header fixed w-full z-50 top-0">
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
        </ul>
      </div>
    );
  } else {
    return (
      <div className="header fixed w-full z-50 top-0">
        <img
          src="../../images/online game logo.png"
          alt=""
          onClick={onImgClick}
          className="header-icon"
        />
        <h1 className="title">{text}</h1>
      </div>
    );
  }
}
export default Header;
