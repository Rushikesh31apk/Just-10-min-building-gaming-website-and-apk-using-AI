const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;
let playerWins = 0;
let computerWins = 0;
let difficultyLevel = 'medium'; // Default difficulty level

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick() {
  if (!gameActive || this.textContent !== '') return;

  this.textContent = currentPlayer;
  if (checkWinner(currentPlayer)) {
    document.getElementById('result').textContent = `Player ${currentPlayer} wins!`;
    updateScore(currentPlayer);
    gameActive = false;
  } else if (isDraw()) {
    document.getElementById('result').textContent = 'It\'s a draw!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (currentPlayer === 'O') {
      setTimeout(computerPlay, 500);
    }
  }
}

function computerPlay() {
  if (difficultyLevel === 'easy') {
    easyComputerPlay();
  } else if (difficultyLevel === 'medium') {
    mediumComputerPlay();
  } else if (difficultyLevel === 'hard') {
    hardComputerPlay();
  }
}

function easyComputerPlay() {
  const emptyCells = [...cells].filter(cell => cell.textContent === '');
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  emptyCells[randomIndex].click();
}

function mediumComputerPlay() {
  let emptyCells = [...cells].filter(cell => cell.textContent === '');
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  let chosenCell = emptyCells[randomIndex];

  // Check if there's a winning move for the computer
  for (let i = 0; i < emptyCells.length; i++) {
    emptyCells[i].textContent = currentPlayer;
    if (checkWinner(currentPlayer)) {
      emptyCells[i].click();
      return;
    }
    emptyCells[i].textContent = '';
  }

  // If no winning move, choose a random empty cell
  chosenCell.click();
}

function hardComputerPlay() {
  let emptyCells = [...cells].filter(cell => cell.textContent === '');
  let chosenCell = null;

  // Check if there's a winning move for the computer
  for (let i = 0; i < emptyCells.length; i++) {
    emptyCells[i].textContent = currentPlayer;
    if (checkWinner(currentPlayer)) {
      emptyCells[i].click();
      return;
    }
    emptyCells[i].textContent = '';
  }

  // Check if there's a winning move for the player and block it
  for (let i = 0; i < emptyCells.length; i++) {
    emptyCells[i].textContent = currentPlayer === 'X' ? 'O' : 'X';
    if (checkWinner(currentPlayer === 'X' ? 'O' : 'X')) {
      emptyCells[i].textContent = currentPlayer;
      emptyCells[i].click();
      return;
    }
    emptyCells[i].textContent = '';
  }

  // If no winning moves for either player, choose a random empty cell
  chosenCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  chosenCell.click();
}


function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function updateScore(player) {
  if (player === 'X') {
    playerWins++;
    document.getElementById('playerWins').textContent = playerWins;
  } else {
    computerWins++;
    document.getElementById('computerWins').textContent = computerWins;
  }
}

document.getElementById('new-game').addEventListener('click', resetGame);

function resetGame() {
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  document.getElementById('result').textContent = '';
}
