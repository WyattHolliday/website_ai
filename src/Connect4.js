import { useNavigate } from 'react-router-dom';
import './Tictactoe.css';

function Connect4() {
  let navigate = useNavigate();

  function handleBackToHome() {
    navigate('/', { replace: true });
  }

  return (
    <>
      <div className='button-container text-center'>
        <button className='home-button' onClick={handleBackToHome}>Back to Home</button>
      </div>
    </>
  );
}

export default Connect4;