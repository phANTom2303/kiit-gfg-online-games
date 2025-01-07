import PersonCard from "./person-card.jsx";
import "./about.css";
import { RxDividerVertical } from "react-icons/rx";
export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="gfg-section">
        <img
          src="../../images/banners/gfg-logo.png"
          alt=""
          className="gfg-logo"
        />

        <div className="gfg-text">
          <div className="first-text">A product of:</div>
          <div className="hero-text">GFG Student Chapter,KIIT</div>
          <div className="text-description">
            Made with the passion and hardwork of the following developers from
            the Core Development domain of GFG Student Chapter, KIIT
          </div>
        </div>
      </div>
      <div className="person-list">
        <PersonCard
          imgPath={"../../images/profile-images/Anish-Goenka.jpg"}
          name={"Anish Goenka"}
          designation={"Project Head & Lead Developer"}
          description={
            "Lead the team to develop the project. Developed the home page and Snakes and Ladders, Connect 4, TicTacToe"
          }
          gitHubLink={"https://github.com/phANTom2303"}
          linkedInLink={"https://www.linkedin.com/in/anish-goenka-0b49a923b/"}
          instagramLink={"https://www.instagram.com/anish_goenka23/"}
        />

        <PersonCard
          imgPath={"../../images/profile-images/soumyadeep-profile.jpg"}
          name={"Soumyadeep Kundu"}
          designation={"Front End Developer"}
          description={
            "Developed the Chain Reaction game and contributed to variuos front end aspects."
          }
          gitHubLink={"https://github.com/VanXodus305"}
          linkedInLink={"https://www.linkedin.com/in/vanxodus305"}
          instagramLink={"https://www.instagram.com/vanxodus305"}
        />

        <PersonCard
          imgPath={"../../images/profile-images/saket-profile.jpg"}
          name={"Saket Saurav"}
          designation={"Front End Developer"}
          description={
            "Developed the Hangman game and contributed to various front end aspects."
          }
          gitHubLink={"https://github.com/sakettt25"}
          linkedInLink={"https://www.linkedin.com/in/sakettt25"}
          instagramLink={"https://www.instagram.com/sakettt_25"}
        />

        <PersonCard
          imgPath={""}
          name={"Hritika Sharan"}
          designation={"Back End Developer"}
          description={
            "Developed the chat and multiplayer functionality game and contributed to various back end aspects."
          }
          gitHubLink={""}
          linkedInLink={""}
          instagramLink={""}
        />

        <PersonCard
          imgPath={""}
          name={"Ashish Kumar"}
          designation={"Back End Developer"}
          description={
            "Developed the chat and multiplayer functionality game and contributed to various back end aspects."
          }
          gitHubLink={""}
          linkedInLink={""}
          instagramLink={""}
        />

        <PersonCard
          imgPath={"../../images/profile-images/saket-profile.jpg"}
          name={"Saket Saurav"}
          designation={"Front End Developer"}
          description={
            "Developed the Hangman game and contributed to various front end aspects."
          }
          gitHubLink={"https://github.com/sakettt25"}
          linkedInLink={"https://www.linkedin.com/in/sakettt25"}
          instagramLink={"https://www.instagram.com/sakettt_25"}
          placeholderClass={"placeholder"}
        />
      </div>
    </div>
  );
}
