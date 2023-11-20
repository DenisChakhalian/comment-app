import express from 'express';
import commentsService from './../services/comments.service';

const getAll = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const comments = await commentsService.getAll();

  res.send({
    comments,
  });
};

export default { getAll };
