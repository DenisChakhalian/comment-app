import {
  GetObjDifferentKeys,
  PayloadDataGet,
} from 'interfaces/requests.interfaces';
import commentsService from './../services/comments.service';
import usersService from './../services/users.service';
import { AddError, GetAll } from 'interfaces/responses.interfaces';
import { Comment, User } from 'models';

const getAll = async (payload: PayloadDataGet): Promise<GetAll> => {
  const comments: Comment[] = await commentsService.getAll(payload);
  const count: number = await commentsService.getCount();
  const pages: number = Math.ceil(count / commentsService.DEFAULT_LIMIT);

  return {
    comments,
    count,
    pages,
    currentPage: payload.currentPage,
  };
};

const create = async (
  payload: GetObjDifferentKeys<User, Comment>,
): Promise<Comment | AddError> => {
  const {
    username,
    email,
    homepage = null,
    content,
    parentId = null,
    fileUrl = null,
  } = payload;

  if (
    !username ||
    !isValidUsername(username) ||
    !email ||
    !isValidEmail(email) ||
    !content ||
    !isValidText(content) ||
    (homepage && !isValidateUrl(homepage)) ||
    (parentId && !isValidUUID(parentId)) ||
    (fileUrl && !isValidateFileUrl(fileUrl))
  ) {
    return {
      error: 'Is not valid data!',
    };
  }

  let user: User = await usersService.getByEmail(email);

  if (!user) {
    user = await usersService.create({ username, email, homepage });
  }

  const comment: Comment = await commentsService.create({
    userId: user.id,
    content,
    parentId,
    fileUrl,
  });

  return {
    user,
    ...comment.dataValues,
  };
};

const getChilds = async (id: string): Promise<Comment[]> => {
  const comments: Comment[] = await commentsService.getChilds(id);

  return comments;
};

const isValidEmail = (email: string): Boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

const isValidUUID = (uuid: string): Boolean => {
  return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
    uuid,
  );
};

const isValidateUrl = (url: string): Boolean => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    url,
  );
};
const isValidateFileUrl = (url: string): Boolean => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^?#]*)?(?:\.(?:jpg|gif|png|txt))(?:[/?#]\S*)?$/i.test(
    url,
  );
};

const isValidText = (text: string): Boolean => {
  const regex = /<([^>]+)>/g;

  const matches = text.match(regex);

  if (matches) {
    for (const match of matches) {
      const tagNameMatch = /<([^>\s/]+)[^>]*>/.exec(match);

      if (tagNameMatch) {
        const tagName = tagNameMatch[1];

        const allowedTags = ['a', 'code', 'strong', 'i'];

        if (!allowedTags.includes(tagName)) {
          return false;
        }
      }
    }
  }

  return true;
};

const isValidUsername = (username: string): Boolean => {
  const regex = /<([^>]+)>/g;

  const matches = username.match(regex);

  if (matches.length) {
    return false;
  }

  return true;
};

export default { getAll, create, getChilds };
