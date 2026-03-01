import { v4 as uuidv4 } from 'uuid';
import Score from '../models/score.model.js';

/**
 * POST /scores
 * Submit leaderboard score
 */
export async function createScore(req, res) {
  try {
    const {
      player_name,
      time_seconds,
      difficulty,
      puzzle_seed,
      mistakes,
      hints_used
    } = req.body;

    if (
      !player_name ||
      !time_seconds ||
      !difficulty ||
      !puzzle_seed
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const fullUuid = uuid();
    const id = fullUuid.slice(0, 6);

    // Calculate rank (faster time = better rank)
    const betterScores = await Score.countDocuments({
      difficulty,
      time_seconds: { $lt: time_seconds }
    });

    const score_rank = betterScores + 1;

    const newScore = new Score({
      id,
      player_name,
      score_rank,
      time_seconds,
      difficulty,
      puzzle_seed,
      mistakes: mistakes || 0,
      hints_used: hints_used || 0,
      tracking: {
        uuid,
        createdDate: new Date().toISOString(),
        verified: true
      }
    });

    await newScore.save();

    return res.status(201).json(newScore);

  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}

/**
 * GET /scores
 * Get all scores (sorted by difficulty + time)
 */
export async function getScores(req, res) {
  try {
    const scores = await Score.find()
      .sort({ difficulty: 1, time_seconds: 1 });

    return res.status(200).json(scores);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}

/**
 * GET /scores/:difficulty
 * Get leaderboard for specific difficulty
 */
export async function getScoresByDifficulty(req, res) {
  try {
    const { difficulty } = req.params;

    const scores = await Score.find({ difficulty })
      .sort({ time_seconds: 1 });

    return res.status(200).json(scores);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}