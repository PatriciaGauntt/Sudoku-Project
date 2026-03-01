import { Router } from 'express';
import { createScore, getScores, getScoresByDifficulty } from '../controllers/score.controller.js';

const router = Router();

router.post('/', createScore);
router.get('/', getScores);
router.get('/:difficulty', getScoresByDifficulty);

export default router;