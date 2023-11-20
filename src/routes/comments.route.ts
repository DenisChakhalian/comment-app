import express from 'express';
import commentsController from '../controllers/comments.controller';

export const commentsRouter = express.Router();

commentsRouter.get('/', commentsController.getAll);
