import { Router } from 'express';

import { isLoggedIn, protect, restrictTo } from '../controllers/authController';
import {
  getHomePage,
  getLoginPage,
  getSignUpPage,
  getCreateCategoryPage,
  getAdminPanelPage,
  getCartPage,
  getProductsPage,
  getCreateProductPage,
  getCategoryProductsPage,
} from '../controllers/viewController';
import Role from '../enums/roles';

const router = Router();

router.use(isLoggedIn);

router.use((req, res, next) => {
  res.locals.imagekit = {
    url: process.env.IMAGEKIT_URL_ENDPOINT,
  };

  next();
});

router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/sign-up', getSignUpPage);

router.get('/products', getProductsPage);
router.get('/category/:categoryId', getCategoryProductsPage);

// Protected & Restricted Routes
router.use(protect, restrictTo([Role.Admin, Role.SuperUser]));

router.get('/cart', getCartPage);
router.get('/create-category', getCreateCategoryPage);
router.get('/create-product', getCreateProductPage);
router.get('/admin-panel', getAdminPanelPage);
export default router;
