import { Model } from 'sequelize-typescript';
import { Comment, User } from '../models';
import { FindOptions, Op, Sequelize } from 'sequelize';
import { DirectionType, PayloadDataGet, SortByType } from '../interfaces/requests.interfaces';

const DEFAULT_LIMIT = 25;

type WithoutModel<T> = Omit<T, keyof Model>;

const getAll = async (payload: PayloadDataGet): Promise<Comment[]> => {
  const options: FindOptions = {
    where: {
      parentId: {
        [Op.eq]: null,
      },
    },
    order: [[SortByType.creationDate, DirectionType.DESC]],
    limit: DEFAULT_LIMIT,
    include: [
      {
        model: User,
        required: true,
      },
    ],
  };

  if (payload.sortBy) {
    const orderBy =
      payload.sortBy === SortByType.creationDate
        ? payload.sortBy
        : Sequelize.col('user.' + payload.sortBy);
    options.order = [[orderBy, payload.direction || DirectionType.ASC]];
  }

  if (payload.currentPage) {
    options.offset = (Number(payload.currentPage) - 1) * DEFAULT_LIMIT;
    options.limit = DEFAULT_LIMIT;
  }

  const comments: Comment[] = await Comment.findAll(options);

  return comments;
};

const getCount = async (): Promise<number> => {
  const countParents: number = await Comment.count({
    where: {
      parentId: {
        [Op.eq]: null,
      },
    },
  });

  return countParents;
};

const create = async (comment: WithoutModel<Comment>): Promise<Comment> => {
  const createdComment: Comment = await Comment.create(comment);

  return createdComment;
};

const getChilds = async (id: string): Promise<Comment[]> => {
  const comments: Comment[] = await Comment.findAll({
    where: {
      parentId: {
        [Op.eq]: id,
      },
    },
    order: [[SortByType.creationDate, DirectionType.DESC]],
    include: [
      {
        model: User,
        required: true,
      },
    ],
  });

  return comments;
};

export default {
  getAll,
  create,
  getChilds,
  getCount,
  DEFAULT_LIMIT,
};
