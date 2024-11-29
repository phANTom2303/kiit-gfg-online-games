import PersonCard from "./person-card.jsx";
import "./about.css";
import { RxDividerVertical } from "react-icons/rx";
export default function AboutPage() {
  return (
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
        name={"Saket Sourav"}
        designation={"Front End Developer"}
        description={
          "Developed the Hangman game and contributed to various front end aspects."
        }
        gitHubLink={"https://github.com/sakettt25"}
        linkedInLink={"https://www.linkedin.com/in/sakettt25"}
        instagramLink={"https://www.instagram.com/sakettt_25"}
      />
    </div>
  );
}
