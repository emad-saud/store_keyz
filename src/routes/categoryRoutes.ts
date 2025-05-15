import { Router } from 'express';

import { protect, restrictTo } from '../controllers/authController';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryController';
import {
  uploadCategoryImage,
  resizeCategoryImage,
} from '../controllers/imageUploadController';
import Role from '../enums/roles';

const router = Router();

router.use(protect, restrictTo([Role.Admin, Role.SuperUser]));

router
  .route('/')
  .get(getAllCategories)
  .post(uploadCategoryImage, resizeCategoryImage, createCategory);

router
  .route(':categoryId')
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

export default router;
