const board = document.getElementById('board');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', index);
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.getAttribute('data-index');
  if (cells[index] !== '' || gameOver) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(`taken-${currentPlayer.toLowerCase()}`);

  if (checkWin()) {
    statusText.textContent = `Победа: ${currentPlayer}!`;
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell !== '')) {
    statusText.textContent = 'Ничья!';
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'О' : 'X';
  statusText.textContent = `Ход: ${currentPlayer}`;
}

function checkWin() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function restartGame() {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  statusText.textContent = `Ход: ${currentPlayer}`;
  createBoard();
}

createBoard();