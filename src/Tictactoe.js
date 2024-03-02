import { useNavigate } from 'react-router-dom';

function Tictactoe() {
  let navigate = useNavigate();

  function handleBackToHome() {
    navigate('/', { replace: true });
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <p>Play tic tac toe against opponents in offline matches!</p>
      <button onClick={handleBackToHome}>Back to Home</button>
    </>
  );
}

export default Tictactoe;