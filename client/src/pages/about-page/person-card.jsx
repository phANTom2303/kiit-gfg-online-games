// import { div } from "framer-motion/client";
import "./personCard.css";
export default function PersonCard({
  imgPath,
  name,
  designation,
  description,
  gitHubLink,
  linkedInLink,
  instagramLink,
  placeholderClass
}) {
  const combinedClasses = `person-card ${placeholderClass}`;
  return (
    <div className= {combinedClasses}>
      <img className="profile-pic" src={imgPath} alt="profile" />
      <div className="person-text">
        <div className="person-name">{name}</div>
        <div className="person-designation">{designation}</div>

        <div className="person-description">{description}</div>
        <div className="person-links">
          <a href={gitHubLink} target="_blank">
            <img src="../images/github-logo.svg" alt="github-link" />
          </a>

          <a href={linkedInLink} target="_blank">
            <img src="../images/linkedin-logo.svg" alt="linkedin-link" />
          </a>

          <a href={instagramLink} target="_blank">
            <img src="../images/instagram-logo.svg" alt="instagram-link" />
          </a>
        </div>
      </div>
    </div>
  );
}
