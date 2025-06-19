window.onload = () => {
  const board = document.getElementById('board');
  const status = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  let cells = Array(9).fill('');
  let gameOver = false;

  restartBtn.addEventListener('click', startGame);

  function startGame() {
    cells = Array(9).fill('');
    gameOver = false;
    status.textContent = 'Ход: X';
    drawBoard();
  }

  function drawBoard() {
    board.innerHTML = '';
    cells.forEach((_, i) => {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      cell.addEventListener('click', handleMove);
      board.appendChild(cell);
    });
  }

  function handleMove(e) {
    const index = +e.target.dataset.index;
    if (cells[index] || gameOver) return;

    makeMove(index, 'X');

    if (!gameOver) {
      setTimeout(() => {
        const aiIndex = getAIMove();
        makeMove(aiIndex, 'O');
      }, 400);
    }
  }

  function makeMove(index, player) {
    cells[index] = player;
    const cell = board.querySelector(`[data-index="${index}"]`);
    cell.textContent = player;
    cell.classList.add(player === 'X' ? 'X' : 'O');

    if (checkWin(player)) {
      status.textContent = `Победа! ${player}`;
      gameOver = true;
    } else if (cells.every(cell => cell)) {
      status.textContent = 'Ничья!';
      gameOver = true;
    } else {
      status.textContent = `Ход: ${player === 'X' ? 'O' : 'X'}`;
    }
  }

  function checkWin(player) {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return wins.some(combo => combo.every(i => cells[i] === player));
  }

  function getAIMove() {

    for (let i = 0; i < 9; i++) {
      if (!cells[i]) {
        cells[i] = 'O';
        if (checkWin('O')) {
          cells[i] = '';
          return i;
        }
        cells[i] = '';
      }
    }

    for (let i = 0; i < 9; i++) {
      if (!cells[i]) {
        cells[i] = 'X';
        if (checkWin('X')) {
          cells[i] = '';
          return i;
        }
        cells[i] = '';
      }
    }

    if (!cells[4]) return 4;

    const corners = [0, 2, 6, 8].filter(i => !cells[i]);
    if (corners.length && Math.random() > 0.3) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    const empty = cells.map((v, i) => v ? null : i).filter(i => i !== null);
    return empty[Math.floor(Math.random() * empty.length)];
  }

  startGame();
};