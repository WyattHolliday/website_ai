import GameDisplay from './GameDisplay';
import empty_pfp from './img/user_avatar.png';
import tictactoe_img from './img/tictactoe.png';
import connect4_img from './img/connect4.png';
import './App.css';

function App() {
  return (
    <>
      <header className="App-header">
        <h1 className='header-text'>Board Game Hub</h1>
        <img src={empty_pfp} className="pfp-img" alt="profile" />
      </header>
      <GameDisplay
        gameName="Tic Tac Toe"
        gameDescription="Play tic tac toe against opponents in offline matches!"
        gameImg={tictactoe_img}
      />
      <GameDisplay 
        gameName="Connect 4" 
        gameDescription="Play connect 4 against opponents in offline matches!" 
        gameImg={connect4_img} 
      />
    </>
  );
}

export default App;
