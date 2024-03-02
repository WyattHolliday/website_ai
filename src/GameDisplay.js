import { Link } from 'react-router-dom';

function GameDisplay({ gameName, gameDescription, gameImg, path }) {
  return (
    <div className="game-display">
        <div className="game-text-container">
            <h2 className="game-text">{gameName}</h2>
            <Link to={path} className="game-text">{gameDescription}</Link>
        </div>
        <img className="game-display-img" src={gameImg} alt={gameName} />
    </div>
  );
}

export default GameDisplay;