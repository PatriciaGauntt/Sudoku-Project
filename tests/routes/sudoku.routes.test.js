import request from 'supertest';
import app from '../../app.js';

describe('POST /api/v1/sudoku/solve', () => {

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

  test('returns solution for valid puzzle', async () => {
    const res = await request(app)
      .post('/api/v1/sudoku/solve')
      .send({ puzzle: validPuzzle });

    expect(res.statusCode).toBe(200);
    expect(res.body.solution).toBeDefined();
    expect(res.body.solution.includes('.')).toBe(false);
  });

  test('returns 400 for invalid puzzle', async () => {
    const res = await request(app)
      .post('/api/v1/sudoku/solve')
      .send({ puzzle: '123' });

    expect(res.statusCode).toBe(400);
  });

});

describe('POST /api/v1/sudoku/validate', () => {

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

  test('returns true for valid move', async () => {
    const res = await request(app)
      .post('/api/v1/sudoku/validate')
      .send({
        puzzle: validPuzzle,
        row: 0,
        col: 2,
        value: '4'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.valid).toBe(true);
  });

  test('returns false for invalid move', async () => {
    const res = await request(app)
      .post('/api/v1/sudoku/validate')
      .send({
        puzzle: validPuzzle,
        row: 0,
        col: 1,
        value: '3'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.valid).toBe(false);
  });

  test('returns 400 for invalid input', async () => {
    const res = await request(app)
      .post('/api/v1/sudoku/validate')
      .send({
        puzzle: '123',
        row: 0,
        col: 0,
        value: '1'
      });

    expect(res.statusCode).toBe(400);
  });

});

