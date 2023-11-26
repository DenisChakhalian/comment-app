import { Comment } from 'models';

export type ResponseData =
  | DataGet
  | DataGetChilds
  | DataAddComment
  | DataAddError;

export interface DataGet {
  data: GetAll;
  type: ResponseType.Comments;
}

export interface DataGetChilds {
  comments: Comment[];
  type: ResponseType.GetChilds;
}

export interface DataAddComment {
  comment: Comment;
  type: ResponseType.Add;
}

export interface DataAddError {
  comment: AddError;
  type: ResponseType.Error;
}

export interface AddError {
  error: string;
}

export interface GetAll {
  comments: Comment[];
  count: number;
  pages: number;
  currentPage: number;
}

export enum ResponseType {
  Comments = 'comments',
  GetChilds = 'getChilds',
  Add = 'add',
  Error = 'error',
}
