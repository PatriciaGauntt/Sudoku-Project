import {
  validatePuzzleString,
  solvePuzzle,
  isValidMove
} from '../services/sudoku.service.js';

/**
 * POST /solve
 */
export function solveSudoku(req, res) {
  const { puzzle } = req.body;

  if (!validatePuzzleString(puzzle)) {
    return res.status(400).json({
      error: 'Invalid puzzle string'
    });
  }

  const solution = solvePuzzle(puzzle);

  if (!solution) {
    return res.status(400).json({
      error: 'Puzzle cannot be solved'
    });
  }

  return res.status(200).json({
    solution
  });
}

/**
 * POST /validate
 */
export function validateMove(req, res) {
  const { puzzle, row, col, value } = req.body;

  if (
    !validatePuzzleString(puzzle) ||
    typeof row !== 'number' ||
    typeof col !== 'number' ||
    !/^[1-9]$/.test(value)
  ) {
    return res.status(400).json({
      error: 'Invalid input'
    });
  }

  const valid = isValidMove(puzzle, row, col, value);

  return res.status(200).json({
    valid
  });
}


