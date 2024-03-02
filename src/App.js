import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameDisplay from './GameDisplay';
import Tictactoe from './Tictactoe';
import empty_pfp from './img/user_avatar.png';
import tictactoe_img from './img/tictactoe.png';
// import connect4_img from './img/connect4.png';
import './App.css';

function App() {
  return (
    <Router>
      <header className="App-header">
        <h1 className='header-text'>Board Game Hub</h1>
        <img src={empty_pfp} className="pfp-img" alt="profile" />
      </header>
      <Routes>
        <Route path="/" element={<GameDisplay gameName="Tic tac toe" gameDescription="Play tic tac toe against opponents in offline matches!" gameImg={tictactoe_img} path="/Tictactoe" />} />
        <Route path="/Tictactoe" element={<Tictactoe />} />

        <Route path="/" element={<GameDisplay gameName="Connect 4" gameDescription="Play Connect 4 against opponents in offline matches!" gameImg={connect4_img} path="/Connect4" />} />
        <Route path="/Connect4" element={<Connect4 />} />
      </Routes>
    </Router>
  );
}

export default App;
