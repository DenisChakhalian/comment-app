import express from 'express';
import cors from 'cors';
import { commentsRouter } from './routes/comments.route';

export function createServer() {
  const app = express();

  app.use(cors());

  app.use('/comments', express.json(), commentsRouter);

  return app;
}
