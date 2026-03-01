import express from 'express';
import cors from 'cors';
import sudokuRoutes from './routes/sudoku.routes.js';
import scoreRoutes from './routes/score.routes.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200'
}));            // allow frontend connection
app.use(express.json());      // parse JSON bodies

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use('/api/v1/sudoku', sudokuRoutes);
app.use('/api/v1/scores', scoreRoutes);

// 404 handler (optional but professional)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
