import { Product } from '../models';
import catchAsync from '../utils/catchAsync';

import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOneFactory,
} from './factoryHandler';

const getAllProducts = getAll(Product);

const getProduct = getOne(Product, 'params:productId');

// const createProduct = createOne(Product, [
//   'price',
//   'categoryId',
//   'name',
//   'categoryId',
//   'description',
// ]);

const createProduct = catchAsync(async (req, res, next) => {
  // console.log('BODY: ');
  // console.log(req.body);

  const product = await Product.create(req.body, {
    fields: ['categoryId', 'description', 'name', 'price'],
  });

  req.product = product;
  next();
});

const deleteProduct = deleteOne(Product, 'params:productId');

const updateProduct = updateOneFactory(Product, 'params:productId', [
  'categoryId',
  'price',
]);

export {
  getProduct,
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
