import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
// import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

function GameDisplay({ gameName, gameDescription, gameImg, path }) {
  return (
    <Container>
      <div className="game-display">
        <div className="game-text-container">
          <h2 className="game-text">{gameName}</h2>
          <p className="game-text">{gameDescription}</p>
          <Link to={path}>
            <Button variant="warning" value="">Play Now!</Button>
          </Link>
        </div>
        <Image className="game-display-img" src={gameImg} rounded />
      </div>
    </Container>
  );
}

export default GameDisplay;