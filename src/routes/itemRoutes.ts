import { Router } from 'express';

import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem,
} from '../controllers/itemController';

import { protect, restrictTo } from '../controllers/authController';
import Role from '../enums/roles';

const router = Router();

router.use(protect, restrictTo([Role.Admin, Role.SuperUser]));

router.route('/').get(getAllItems).post(createItem);

router.route('/:itemId').get(getItem).patch(updateItem).delete(deleteItem);

export default router;
