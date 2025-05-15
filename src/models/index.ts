import { DataTypes } from 'sequelize';

import db from '../database';

import ProductModel from './productModel';
import CategoryModel from './categoryModel';
import ItemModel from './itemModel';
import UserModel from './userModel';
import ProductImageModel from './productImageModel';
import orderModel from './orderModel';

const Category = CategoryModel(db);
const Product = ProductModel(db);
const Item = ItemModel(db);
const User = UserModel(db);
const Order = orderModel(db);
const ProductImage = ProductImageModel(db);

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Item, { foreignKey: 'productId' });
Item.belongsTo(Product, { foreignKey: 'productId' });

Item.hasOne(Order, { foreignKey: 'itemId' });
Order.belongsTo(Item, { foreignKey: 'itemId' });

type UserInstace = InstanceType<typeof User>;
type ProductInstance = InstanceType<typeof Product>;

export {
  db,
  Product,
  Category,
  Item,
  User,
  UserInstace,
  ProductInstance,
  ProductImage,
  Order,
};
