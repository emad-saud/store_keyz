import { Router } from 'express';

import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getUserOrders,
  getProductItem,
} from '../controllers/orderController';
import { protect, restrictTo } from '../controllers/authController';
import Role from '../enums/roles';

const router = Router();

router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);

// Super User routes
router.use(restrictTo([Role.SuperUser]));
router.get('/get-all-orders', getAllOrders);
router.get('/:userId', getUserOrders);

export default router;
