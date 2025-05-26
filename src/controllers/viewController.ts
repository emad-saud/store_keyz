import catchAsync from '../utils/catchAsync';
import { Category, Item, Order, Product, User } from '../models';
import { RequestHandler } from 'express';
import { title } from 'process';

export const getHomePage = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll();

  res.render('home', {
    title: 'HOME',
    categories,
  });
});

export const getLoginPage: RequestHandler = (req, res, next) => {
  res.render('login', {
    title: 'Login',
  });
};

export const getSignUpPage: RequestHandler = (req, res, next) => {
  res.render('sign-up', {
    title: 'Sign Up',
  });
};

export const getCreateCategoryPage: RequestHandler = (req, res, next) => {
  res.render('create-category', {
    title: 'Create Category',
  });
};

export const getAdminPanelPage: RequestHandler = catchAsync(
  async (req, res, next) => {
    const products = await Product.findAll({});
    res.render('admin-panel', {
      title: 'Admin Panel',
      products,
    });
  }
);

export const getProductsPage: RequestHandler = catchAsync(
  async (req, res, next) => {
    const products = await Product.findAll();

    res.render('products', {
      title: 'Products',
      products,
    });
  }
);

export const getCartPage: RequestHandler = catchAsync(
  async (req, res, next) => {
    const orders = await Order.findAll({
      where: {
        userId: req.user!.id,
      },
      order: [['createdAt', 'DESC']],
    });

    console.log(orders);

    res.render('cart', {
      title: 'Cart',
      orders,
    });
  }
);

export const getCreateProductPage: RequestHandler = catchAsync(
  async (req, res, next) => {
    const categories = await Category.findAll();

    res.render('create-product', {
      title: 'Create Product',
      categories,
    });
  }
);

export const getCategoryProductsPage: RequestHandler = catchAsync(
  async (req, res, next) => {
    const products = await Product.findAll({
      where: {
        categoryId: req.params.categoryId,
      },
    });

    res.render('products', {
      title: 'Products',
      products,
    });
  }
);
