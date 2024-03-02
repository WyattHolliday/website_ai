import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameDisplay from './GameDisplay';
import Tictactoe from './Tictactoe';
import empty_pfp from './img/user_avatar.png';
import tictactoe_img from './img/tictactoe.png';
import connect4_img from './img/connect4.png';
import Connect4 from './Connect4';
import './App.css';

function App() {
  return (
    <Router>
      <header className="App-header">
        <h1 className='header-text'>Board Game Hub</h1>
        <img src={empty_pfp} className="pfp-img" alt="profile" />
      </header>

      <GameDisplay gameName="Connect 4" gameDescription="Play Connect4 against opponents in offline matches!" gameImg={connect4_img} path="Connect4" />
      <GameDisplay gameName="Tic tac toe" gameDescription="Play tic tac toe against opponents in offline matches!" gameImg={tictactoe_img} path="Tictactoe" />

      <Routes>
        <Route path="/">
          <Route path="/Connect4" element={<Connect4 />} />
          <Route path="/Tictactoe" element={<Tictactoe />} />
        </Route>
      </Routes>
    </Router >
  );
}

export default App;
