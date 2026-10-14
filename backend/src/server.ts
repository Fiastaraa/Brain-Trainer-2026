import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Core Middlewares
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount API routes under /api and /api/v1
app.use('/api', apiRouter);
app.use('/api/v1', apiRouter);

// 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handler Middleware
app.use(errorHandler);

// Start Server Listener
app.listen(PORT, () => {
  console.log(`🧠 Brain Trainer Backend listening on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
});

export default app;
