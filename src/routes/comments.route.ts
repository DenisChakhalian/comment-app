import {
  AddError,
  GetAll,
  ResponseData,
  ResponseType,
} from '../interfaces/responses.interfaces';
import commentsController from '../controllers/comments.controller';
import {
  RequestActionType,
  RequestData,
} from '../interfaces/requests.interfaces';
import { Comment } from 'models';

const commentsRouter = async ({
  action,
  payload,
}: RequestData): Promise<ResponseData> => {
  switch (action) {
    case RequestActionType.Get: {
      const data: GetAll = await commentsController.getAll(payload);

      return {
        type: ResponseType.Comments,
        data,
      };
    }
    case RequestActionType.GetChilds: {
      const comments: Comment[] = await commentsController.getChilds(
        payload.parentId,
      );

      return {
        type: ResponseType.GetChilds,
        comments,
      };
    }
    case RequestActionType.Post: {
      const comment: Comment | AddError =
        await commentsController.create(payload);

      if ('error' in comment) {
        return {
          type: ResponseType.Error,
          comment,
        };
      }

      return {
        type: ResponseType.Add,
        comment,
      };
    }
    default:
      return {
        type: ResponseType.Error,
        comment: { error: 'Bad request!' },
      };
  }
};

export default {
  commentsRouter,
};
