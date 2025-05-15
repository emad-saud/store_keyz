import { Item } from '../models';
import catchAsync from '../utils/catchAsync';

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOneFactory,
} from './factoryHandler';

const getAllItems = getAll(Item);

const getItem = getOne(Item, 'params:itemId');

const createItem = createOne(Item, ['productId']);

const deleteItem = deleteOne(Item, 'params:itemId');

const updateItem = updateOneFactory(Item, 'params:itemId', [
  'productId',
  'valid',
]);

export { getItem, getAllItems, createItem, deleteItem, updateItem };
