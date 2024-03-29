let win_value = 10;
let loss_value = -10;
let player = 'X';
let ai = 'O';

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
        if (board[line[0]] === board[line[1]] && board[line[1]] === board[line[2]] && board[line[0]] === ai) {
            return win_value;
        } else if (board[line[0]] === board[line[1]] && board[line[1]] === board[line[2]] && board[line[0]] === player) {
            return loss_value;
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
    if (score === win_value) {
        return score - depth;
    }
    if (score === loss_value) {
        return score + depth;
    }
    if (game_over(board)) {
        return 0;
    }

    if (is_maximizing) {
        let best = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = ai;
                best = Math.max(best, minimax(board, depth + 1, !is_maximizing));
                board[i] = null;
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = player;
                best = Math.min(best, minimax(board, depth + 1, !is_maximizing));
                board[i] = null;
            }
        }
        return best;
    }
}

function search_all_moves(board) {
    let best_val = -Infinity;
    let best_move = -1;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = ai;
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

export function find_ai_move(board, aisymbol, difficulty) {
    // let difficulty = set_difficulty === 10 ? 17 : set_difficulty;
    player = aisymbol === 'X' ? 'O' : 'X';
    ai = aisymbol;
    let ai_move = null;

    if ((Math.random() * 10) < difficulty) {
        win_value = 17;
        loss_value = -17;
        ai_move = search_all_moves(board) // Find the best move
    } else if (Math.random() < 0.5) { // Randomly choose a suboptimal move
        if (Math.random() < 0.5) {
            win_value = difficulty + 2;
            loss_value = -difficulty + 2;
            ai_move = search_all_moves(board) // Find a suboptimal move at difficulty + 2
        } else {
            win_value = difficulty - 2;
            loss_value = -difficulty - 2;
            ai_move = search_all_moves(board) // Find a suboptimal move at difficulty - 2
        }
    } else {
        win_value = difficulty;
        loss_value = -difficulty;
        ai_move = search_all_moves(board) // Find a suboptimal move at difficulty
    }
    return ai_move;
}

export default find_ai_move;