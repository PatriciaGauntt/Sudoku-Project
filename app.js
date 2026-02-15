import express from 'express';
import sudokuRoutes from './routes/sudoku.routes.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/v1/sudoku', sudokuRoutes);

export default app;
