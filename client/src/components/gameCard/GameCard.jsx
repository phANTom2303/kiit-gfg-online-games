import './GameCard.css'

function GameCard({ onCardClick, imgPath, gameName, playerCount, gameDuration }) {
    return (
        <div className="gameCard" onClick={onCardClick}>
            <img src={imgPath} />

            <div className="cardDescription">

                <span id='gameName'>{gameName} </span>

                <img src="../../images/players-icon.svg" alt="" />
                <span > {playerCount} </span>



                <img id='timerIcon' src="../../images/timer-icon.svg" alt="" />
                <span>{gameDuration}</span>

            </div>
        </div>
    );
}
export default GameCard;