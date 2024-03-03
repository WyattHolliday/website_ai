import blackChecker from '../img/Black Checker.svg';
import redChecker from '../img/Red Checker.svg';

function Slot({ player, y, x }) {

    return (
        <div className="slot" x={x} y={y}>
            {(player !== 0) && <img src={player === 1 ? redChecker : player === 2 ? blackChecker : null} width="100%" height="100%" />}
        </div>
    );
}



export default Slot;