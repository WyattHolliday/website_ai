import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameDisplay from './GameDisplay';
import Tictactoe from './Tictactoe';
import Connect4 from './Connect4';
import empty_pfp from './img/user_avatar.png';
import tictactoe_img from './img/tictactoe.png';
import connect4_img from './img/connect4.png';
import './App.css';

function App() {
  return (
    <Router>
      <header className="App-header">
        <h1 className='header-text'>Board Game Hub</h1>
        <img src={empty_pfp} className="pfp-img" alt="profile" />
      </header>
      <Routes>
        <Route path="/" element={
          <>
            <GameDisplay gameName="Tic Tac Toe" gameDescription="Play tic tac toe against opponents in offline matches!" gameImg={tictactoe_img} path="/Tictactoe" />
            <GameDisplay gameName="Connect 4" gameDescription="Play connect 4 against opponents in offline matches!" gameImg={connect4_img} path="/Connect4" />
          </>
        } />
        <Route path="/Tictactoe" element={<Tictactoe />} />
        <Route path="/Connect4" element={<Connect4 />} />
      </Routes>
    </Router>
  );
}

export default App;