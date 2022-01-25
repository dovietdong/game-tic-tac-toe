// Tic Tac Toe AI with Minimax Algorithm


// khai báo Alpha and Beta
let MAX = 1000;
let MIN = -1000;

function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, 0, false, MIN, MAX);
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
  X: -10,
  O: 10,
  tie: 0
};



function minimax(board, depth, isMaximizing, alpha, beta) {
  
  // kiểm tra điều kiên thắng
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }
  
  if (isMaximizing) {
    let bestScore = MIN;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          bestScore = Math.max(score, bestScore);
          //sau khi thực hiện xong 1 bước đi thì lập tức trả lại ô trống
          board[i][j] = '';
          alpha = Math.max(alpha, bestScore);
          // Alpha Beta Pruning
          if (beta <= alpha)
            break;
        }
      }
    }
    //best score ccó thể là 0, -1, 1 tương đương với hòa thắng hay thua
    //hàm trả về giá trị sau khi đã thoát khỏi đệ quy
    return bestScore;

  } else {
    let bestScore = MAX;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          bestScore = Math.min(score, bestScore);
          board[i][j] = '';
          beta = Math.min(beta, bestScore);
          // Alpha Beta Pruning
          if (beta <= alpha)
            break;
        }
      }
    }
    return bestScore;
  }
}
