import { User } from '../models/index';

import {
  getAll,
  createOne,
  updateOneFactory,
  deleteOne,
  getOne,
} from './factoryHandler';

const getAllUsers = getAll(User);

const getUser = getOne(User, 'params:userId');

const createUser = createOne(User, [
  'email',
  'password',
  'passwordConfirm',
  'username',
]);

const deleteUser = deleteOne(User, 'params:userId');

const updateUser = updateOneFactory(User, 'params:userId', [
  'username',
  'picture',
]);

export { getAllUsers, getUser, createUser, deleteUser, updateUser };
