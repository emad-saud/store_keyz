import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOneFactory,
} from './factoryHandler';

import { Item, Order } from '../models';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

const getAllOrders = getAll(Order);

const getOrder = getOne(Order, 'params:orderId');

const createOrder = catchAsync(async (req, res, next) => {
  if (!req.body.itemId) {
    return next(
      new AppError('Please provide itemId to proceed to create the order!', 400)
    );
  }

  const order = await Order.create({
    itemId: req.body.itemId,
    userId: req.user!.id,
  });

  const item = await Item.update(
    { valid: false },
    {
      where: {
        id: req.body.itemId,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Created the order successfully!',
    data: order,
  });
});

const deleteOrder = deleteOne(Order, 'params:orderId');

const getMyOrders = catchAsync(async (req, res, next) => {
  const myOrders = await Order.findAll({
    where: {
      userId: req.user!.id,
    },
    include: {
      model: Item,
      as: 'items',
    },
  });

  res.status(200).json({
    status: 'success',
    data: myOrders,
  });
});

const getUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: {
      userId: req.params.userId,
    },
    include: {
      model: Item,
      as: 'items',
    },
  });

  res.status(200).json({
    status: 'success',
    data: orders,
  });
});

export { getAllOrders, getMyOrders, createOrder, deleteOrder, getUserOrders };
