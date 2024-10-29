import "./header.css";
import MuteButton from "../muteButton";
function Header({
  text,
  onImgClick,
  backButton,
  soundStatus,
  updateSoundStatus,
}) {
  if (backButton) {
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
              style={{ height: "3vw", width: "3vw" }}
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

          {/* <li style={{ cursor: "pointer" }}>
            <img
              src="../../header-icons/info-icon.png"
              style={{ height: "3vw", width: "3vw" }}
              alt="About"
              className="header-icon"
            />
          </li> */}
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
        <ul>
          {/* <li style={{ cursor: "pointer", textDecoration: "underline" }}>
            <img
              src="../../header-icons/info-icon.png"
              style={{ height: "3vw", width: "3vw" }}
              alt="About"
              className="header-icon"
            />
          </li> */}
        </ul>
      </div>
    );
  }
}
export default Header;
