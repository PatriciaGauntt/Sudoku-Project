import { Router } from 'express';
import { solveSudoku, validateMove } from '../controllers/sudoku.controller.js';

const router = Router();

router.post('/solve', solveSudoku);
router.post('/validate', validateMove);

export default router;
