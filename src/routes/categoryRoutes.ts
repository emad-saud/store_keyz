import { Router } from 'express';

import { protect, restrictTo } from '../controllers/authController';

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryController';

const router = Router();

router.route('/').get(getAllCategories).post(createCategory);

router
  .route(':categoryId')
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

export default router;
