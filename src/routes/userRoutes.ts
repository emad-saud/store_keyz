import { Router } from 'express';

import {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
} from '../controllers/userController';

import {
  authPassword,
  signUp,
  protect,
  restrictTo,
} from '../controllers/authController';
import Role from '../enums/roles';

const router = Router();

router.post('/login', authPassword);
router.post('/sign-up', signUp);

router.use(protect, restrictTo([Role.Admin, Role.SuperUser]));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUser).delete(deleteUser);

export default router;
