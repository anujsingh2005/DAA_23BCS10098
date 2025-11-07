const gridElement = document.getElementById('grid');
const messageElement = document.getElementById('message');
const solveBtn = document.getElementById('solveBtn');
const applyBtn = document.getElementById('applyBtn');
const clearBtn = document.getElementById('clearBtn');
const easyBtn = document.getElementById('easyBtn');
const mediumBtn = document.getElementById('mediumBtn');
const hardBtn = document.getElementById('hardBtn');

let grid = Array.from({ length: 9 }, () => Array(9).fill(0));
let solvedBoard = null;

function createGrid() {
  gridElement.innerHTML = '';
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.value = grid[r][c] === 0 ? '' : grid[r][c];
      input.addEventListener('input', e => {
        const val = e.target.value.replace(/[^1-9]/g, '');
        grid[r][c] = val === '' ? 0 : Number(val);
        e.target.value = val;
      });
      if ((c + 1) % 3 === 0 && c !== 8) input.style.borderRight = '2px solid #000';
      if ((r + 1) % 3 === 0 && r !== 8) input.style.borderBottom = '2px solid #000';
      gridElement.appendChild(input);
    }
  }
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }
  const sr = Math.floor(row / 3) * 3;
  const sc = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[sr + r][sc + c] === num) return false;
    }
  }
  return true;
}

function findEmpty(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return [r, c];
    }
  }
  return null;
}

function solveBacktrack(board) {
  const empty = findEmpty(board);
  if (!empty) return true;
  const [r, c] = empty;
  for (let num = 1; num <= 9; num++) {
    if (isValid(board, r, c, num)) {
      board[r][c] = num;
      if (solveBacktrack(board)) return true;
      board[r][c] = 0;
    }
  }
  return false;
}

function validateInitial(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val !== 0) {
        board[r][c] = 0;
        if (!isValid(board, r, c, val)) {
          board[r][c] = val;
          return { ok: false, row: r, col: c };
        }
        board[r][c] = val;
      }
    }
  }
  return { ok: true };
}

function solve() {
  messageElement.textContent = '';
  const board = grid.map(r => r.slice());
  const v = validateInitial(board.map(r => r.slice()));
  if (!v.ok) {
    messageElement.textContent = `Invalid puzzle: conflict at row ${v.row + 1}, col ${v.col + 1}`;
    return;
  }
  const boardCopy = board.map(r => r.slice());
  if (solveBacktrack(boardCopy)) {
    solvedBoard = boardCopy;
    messageElement.textContent = 'Solved — review or apply the solution.';
  } else {
    solvedBoard = null;
    messageElement.textContent = 'No solution found.';
  }
}

function applySolution() {
  if (!solvedBoard) {
    messageElement.textContent = 'No solution to apply.';
    return;
  }
  grid = solvedBoard.map(r => r.slice());
  createGrid();
  messageElement.textContent = 'Solution applied.';
}

function clearGrid() {
  grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  solvedBoard = null;
  createGrid();
  messageElement.textContent = '';
}

const EXAMPLES = {
  Easy: [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
  ],
  Medium: [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ],
  Hard: [
    [0,0,5,3,0,0,0,0,0],
    [8,0,0,0,0,0,0,2,0],
    [0,7,0,0,1,0,5,0,0],
    [4,0,0,0,0,5,3,0,0],
    [0,1,0,0,7,0,0,0,6],
    [0,0,3,2,0,0,0,8,0],
    [0,6,0,5,0,0,0,0,9],
    [0,0,4,0,0,0,0,3,0],
    [0,0,0,0,0,9,7,0,0]
  ]
};

easyBtn.addEventListener('click', () => loadExample(EXAMPLES.Easy));
mediumBtn.addEventListener('click', () => loadExample(EXAMPLES.Medium));
hardBtn.addEventListener('click', () => loadExample(EXAMPLES.Hard));

function loadExample(example) {
  grid = example.map(r => r.slice());
  solvedBoard = null;
  createGrid();
  messageElement.textContent = '';
}

solveBtn.addEventListener('click', solve);
applyBtn.addEventListener('click', applySolution);
clearBtn.addEventListener('click', clearGrid);

createGrid();