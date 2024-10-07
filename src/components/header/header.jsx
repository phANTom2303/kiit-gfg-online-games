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
            Go Back{" "}
          </li>
          <li style={{ cursor: "pointer", textDecoration: "underline" }}>
            About
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
            About
          </li>
        </ul>
      </div>
    );
  }
}
export default Header;
