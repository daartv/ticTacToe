
let prompt = require('prompt');

let board = {
  1: ' ',
  2: ' ',
  3: ' ',
  4: ' ',
  5: ' ',
  6: ' ',
  7: ' ',
  8: ' ',
  9: ' '
};

const markPlay = (position, mark) => {
  board[position] = mark;
};

const visualizeBoard = () => {
  console.log('\n' +
  ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
  ' ---------\n' +
  ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
  ' ---------\n' +
  ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');
};

const isInt = (value) => {
  let x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
};

const validateMove = (position) => {
  if (isInt(position) && board[position] === ' ') {
    return true;
  }
  return false;
};

const winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
                       [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

const checkWin = (player) => {
  for (let i = 0; i < winCombinations.length; i++) {
    let markCount = 0;
    for (let j = 0; j < winCombinations[i].length; j++) {
      if (board[winCombinations[i][j]] === player) {
        markCount++;
      }
      if (markCount === 3) {
        return true;
      }
    }
  }
  return false;
};

const playTurn = (player) => {

  console.log('Your turn player: ' + player);
  prompt.start();
  prompt.get(['position'], function (err, result) {

    if (validateMove(result.position)) {
      markPlay(result.position, player);
      visualizeBoard();
      if (checkWin(player)) {
        console.log('You won');
        return;
      }
      if (player === 'X') {
        playTurn('O');
      } else {
        playTurn('X');
      }
    } else {
      console.log('incorrect, try one more time');
      playTurn(player);
    }
  });
};

console.log('Game started: \n' +
  ' 1 | 2 | 3 \n' +
  ' --------- \n' +
  ' 4 | 5 | 6 \n' +
  ' --------- \n' +
  ' 7 | 8 | 9 \n');


playTurn('X');