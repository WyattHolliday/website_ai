const WIN_VALUE = 10;
const LOSS_VALUE = -10;
const PLAYER_SYMBOL = 'X';
const AI_SYMBOL = 'O';

function evaluate(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let line of lines) {
        if (board[line[0]] === board[line[1]] && board[line[1]] === board[line[2]] && board[line[0]] === AI_SYMBOL) {
            return WIN_VALUE;
        } else if (board[line[0]] === board[line[1]] && board[line[1]] === board[line[2]] && board[line[0]] === PLAYER_SYMBOL) {
            return LOSS_VALUE;
        }
    }
    return 0;
}

function game_over(board) {
    for (let cell of board) {
        if (cell === null) {
            return false;
        }
    }
    return true;
}

function minimax(board, depth, is_maximizing) {
    let score = evaluate(board);
    if (score === WIN_VALUE) {
        return score - depth;
    }
    if (score === LOSS_VALUE) {
        return score + depth;
    }
    if (game_over(board)) {
        return 0;
    }

    if (is_maximizing) {
        let best = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = AI_SYMBOL;
                best = Math.max(best, minimax(board, depth + 1, !is_maximizing));
                board[i] = null;
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = PLAYER_SYMBOL;
                best = Math.min(best, minimax(board, depth + 1, !is_maximizing));
                board[i] = null;
            }
        }
        return best;
    }
}

export function find_best_move(board) {
    let best_val = -Infinity;
    let best_move = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = AI_SYMBOL;
            let move_val = minimax(board, 0, false);
            board[i] = null;
            if (move_val > best_val) {
                best_val = move_val;
                best_move = i;
            }
        }
    }
    return best_move;
}

export default find_best_move;