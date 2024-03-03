import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import './connect4.css';
import Board from './Board';

function Connect4() {

    let navigate = useNavigate();

    function handleClick() {
        navigate("/", { replace: true });
    }

    // Create a Connect 4 Grid 7x6 grid.
    // Create functionality to indicate which player's move it is.

    return (
        <Container>
            <div>
                <h1>Connect 4</h1>

                <p>Go back to the Game Selection screen:</p>
                <button onClick={handleClick}>Go back here!</button>

                <Board />

            </div>
        </Container>
    );
}



export default Connect4;