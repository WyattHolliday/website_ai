function GameDisplay({ gameName, gameDescription, gameImg }) {
  return (
    <div className="game-display">
        <div className="game-text-container">
            <h2 className="game-text">{gameName}</h2>
            <p className="game-text">{gameDescription}</p>
        </div>
        <img className="game-display-img" src={gameImg} alt={gameName} />
    </div>
  );
}

export default GameDisplay;