import { Model } from 'sequelize-typescript';
import { User } from '../models';

type WithoutModel<T> = Omit<T, keyof Model>;

const getByEmail = async (email: string): Promise<User> => {
  const user: User = await User.findOne({
    where: {
      email,
    },
  });

  return user;
};

const create = async (user: WithoutModel<User>): Promise<User> => {
  const createdUser: User = await User.create(user);

  return createdUser;
};

export default {
  getByEmail,
  create,
};
