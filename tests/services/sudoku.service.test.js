import {
  validatePuzzleString,
  isValidMove,
  solvePuzzle
} from '../../services/sudoku.service.js';

describe('Sudoku Service', () => {

  const validPuzzle =
    '53..7....' +
    '6..195...' +
    '.98....6.' +
    '8...6...3' +
    '4..8.3..1' +
    '7...2...6' +
    '.6....28.' +
    '...419..5' +
    '....8..79';

  test('valid puzzle string passes validation', () => {
    expect(validatePuzzleString(validPuzzle)).toBe(true);
  });

  test('invalid puzzle string fails validation', () => {
    expect(validatePuzzleString('123')).toBe(false);
  });

  test('valid move returns true', () => {
    expect(isValidMove(validPuzzle, 0, 2, '4')).toBe(true);
  });

  test('invalid move returns false', () => {
    expect(isValidMove(validPuzzle, 0, 1, '3')).toBe(false);
  });

  // ✅ NEW TESTS FOR SOLVER

  test('solves a valid puzzle', () => {
    const solved = solvePuzzle(validPuzzle);

    expect(solved).not.toBeNull();
    expect(solved.includes('.')).toBe(false);
    expect(solved.length).toBe(81);
  });

  test('returns null for invalid puzzle', () => {
    const result = solvePuzzle('123');
    expect(result).toBeNull();
  });

});
