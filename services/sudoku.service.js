/**
 * Validate that a puzzle string is valid format
 * @param {string} puzzle
 * @returns {string | null} solved puzzle or null if unsolvable
 */
export function validatePuzzleString(puzzle) {
  if (!puzzle || puzzle.length !== 81) {
    return false;
  }

  return /^[1-9.]+$/.test(puzzle);
}

/**
 * Check if a value can be placed at row/column
 * @param {string} puzzle
 * @param {number} row
 * @param {number} col
 * @param {string} value
 * @returns {string | null} solved puzzle or null if unsolvable
 */
export function isValidMove(puzzle, row, col, value) {
  const grid = stringToGrid(puzzle);

  // Check row
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === value) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === value) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (grid[r][c] === value) return false;
    }
  }

  return true;
}

/**
 * Solve a Sudoku puzzle
 * @param {string} puzzle
 * @returns {string | null}
 */
export function solvePuzzle(puzzle) {
  if (!validatePuzzleString(puzzle)) {
    return null;
  }

  const grid = stringToGrid(puzzle);

  const solved = solveGrid(grid);

  return solved ? gridToString(grid) : null;
}
function solveGrid(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {

      if (grid[row][col] === '.') {

        for (let num = 1; num <= 9; num++) {
          const value = String(num);

          if (isValidMove(gridToString(grid), row, col, value)) {
            grid[row][col] = value;

            if (solveGrid(grid)) {
              return true;
            }

            // Backtrack
            grid[row][col] = '.';
          }
        }

        return false; // no number fits here
      }
    }
  }

  return true; // solved
}

/**
 * Convert puzzle string to 2D grid
 */
function stringToGrid(puzzle) {
  const grid = [];

  for (let i = 0; i < 9; i++) {
    grid.push(puzzle.slice(i * 9, i * 9 + 9).split(''));
  }

  return grid;
}

function gridToString(grid) {
  return grid.flat().join('');
}



