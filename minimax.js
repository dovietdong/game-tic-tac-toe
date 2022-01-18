// Tic Tac Toe AI with Minimax Algorithm


function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

let scores = {
  X: 1,
  O: -1,
  tie: 0
};
function minimax(board, depth, isMaximizing) {
  let bestScoreA;
  let bestScoreB;
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }
  if (isMaximizing) {
    let bestScoreA = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          bestScoreA = max(score, bestScoreA);
          board[i][j] = '';
          if (bestScoreA >= bestScoreB) {
            break;
          }
        }
      }
    }
    return bestScoreA;
  } else {
    let bestScoreB = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          bestScoreB = min(score, bestScoreB);
          board[i][j] = '';
          if (bestScoreA <= bestScoreB) {
            break;
          }
        }
      }
    }
    return bestScoreB;
  }
}


