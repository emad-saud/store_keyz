import { Router } from 'express';

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../controllers/productController';

import { protect, restrictTo } from '../controllers/authController';
import Role from '../enums/roles';

const router = Router();

router.get('/', getAllProducts);
router.get('/:productId', getProduct);

router.use(protect, restrictTo([Role.Admin, Role.SuperUser]));
router.post('/', createProduct);
router.route('/:productId').patch(updateProduct).delete(deleteProduct);

export default router;
