import { Comment, User } from 'models';

export type RequestData = RequestDataPost | RequestDataGet | RequestDataGetChilds;

export type GetObjDifferentKeys<T, U> = Omit<T, keyof U> & Omit<U, keyof T>;

export interface RequestDataPost {
  event: RequestEventType.Comments;
  action: RequestActionType.Post;
  payload: GetObjDifferentKeys<User, Comment>;
}

export interface RequestDataGet {
  event: RequestEventType.Comments;
  action: RequestActionType.Get;
  payload: PayloadDataGet;
}

export interface RequestDataGetChilds {
  event: RequestEventType.Comments;
  action: RequestActionType.GetChilds;
  payload: {
    parentId: string;
  };
}

export enum RequestEventType {
  Comments = 'comments',
}

export enum RequestActionType {
  Post = 'post',
  Get = 'get',
  GetChilds = 'getChilds',
}

export interface PayloadDataGet {
  sortBy: SortByType;
  direction: DirectionType;
  currentPage: number;
}

export enum SortByType {
  creationDate = 'creationDate',
  email = 'email',
  username = 'username',
}

export const enum DirectionType {
  DESC = 'DESC',
  ASC = 'ASC',
}
