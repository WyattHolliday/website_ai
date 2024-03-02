

function GameSelection() {
    return (
        <Router>
            <header className="App-header">
                <h1 className='header-text'>Board Game Hub</h1>
                <img src={empty_pfp} className="pfp-img" alt="profile" />
            </header>



            <Routes>
                <Route path="/", element={      
              <GameDisplay gameName="Connect 4" gameDescription="Play Connect4 against opponents in offline matches!" gameImg={connect4_img} path="Connect4" />
              <GameDisplay gameName="Tic tac toe" gameDescription="Play tic tac toe against opponents in offline matches!" gameImg={tictactoe_img} path="Tictactoe" />}>
                <Route path="/Connect4" element={<Connect4 />} />
                <Route path="/Tictactoe" element={<Tictactoe />} />
            </Route>
        </Routes>
      </Router >
    );
}