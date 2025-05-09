import { DataTypes } from 'sequelize';

import db from '../database';

import ProductModel from './productModel';
import CategoryModel from './categoryModel';
import ItemModel from './itemModel';
import UserModel from './userModel';
import ProductImageModel from './productImageModel';

const Category = CategoryModel(db);
const Product = ProductModel(db);
const Item = ItemModel(db);
const User = UserModel(db);
const ProductImage = ProductImageModel(db);

Category.hasOne(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// User.hasMany(Item, { foreignKey: 'userId' });
// Item.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Item, { foreignKey: 'productId' });
Item.belongsTo(Product, { foreignKey: 'productId' });

type UserInstace = InstanceType<typeof User>;

export { db, Product, Category, Item, User, UserInstace, ProductImage };
