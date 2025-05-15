import { Category } from '../models';
import catchAsync from '../utils/catchAsync';
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOneFactory,
} from './factoryHandler';

const getAllCategories = getAll(Category);
const getCategory = getOne(Category, 'params:categoryId');
const deleteCategory = deleteOne(Category, 'params:categoryId');
const updateCategory = updateOneFactory(Category, 'params:categoryId', [
  'name',
  'image',
]);

const createCategory = createOne(Category, ['name', 'image']);

export {
  getAllCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
