import styles from "./header.module.css";
function Header({ text, onImgClick, backButton }) {
  if (backButton) {
    return (
      <div className={styles.header}>
        <img
          src="../../images/online game logo.png"
          alt=""
          onClick={onImgClick}
        />
        <h1 className="title">{text}</h1>
        <ul>
          <li
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={onImgClick}
          >
            <img src="../../header-icons/back-arrow.png" style={{ height: "3vw" , width: "3vw" }} alt="Go Back" />
          </li>
          <li style={{ cursor: "pointer", textDecoration: "underline" }}>
            <img src="../../header-icons/info-icon.png" style={{ height: "3vw" , width: "3vw" }} alt="About" />
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className={styles.header}>
        <img
          src="../../images/online game logo.png"
          alt=""
          onClick={onImgClick}
        />
        <h1 className="title">{text}</h1>
        <ul>
        <li style={{ cursor: "pointer", textDecoration: "underline" }}>
            <img src="../../header-icons/info-icon.png" style={{ height: "3vw" , width: "3vw" }} alt="About" />
          </li>
        </ul>
      </div>
    );
  }
}
export default Header;
