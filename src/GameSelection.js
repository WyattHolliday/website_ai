import tictactoe_img from './img/tictactoe.png';
import connect4_img from './img/connect4.png';
import GameDisplay from './GameDisplay';


function GameSelection() {
    return (
        <>
            <GameDisplay gameName="Connect 4" gameDescription="Play Connect4 against opponents in offline matches!" gameImg={connect4_img} path="Connect4" />
            <GameDisplay gameName="Tic tac toe" gameDescription="Play tic tac toe against opponents in offline matches!" gameImg={tictactoe_img} path="Tictactoe" />
        </>
    );
}

export default GameSelection;