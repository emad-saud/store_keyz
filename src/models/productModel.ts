import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface ProductAttributes {
  id: string;
  price: number;
  categoryId: string;
  name: string;
  description: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

export default (db: Sequelize) => {
  class Product extends Model<ProductAttributes, ProductCreationAttributes> {}

  Product.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(2),
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Price must be more than 0',
          },
        },
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { sequelize: db, modelName: 'Product' }
  );

  return Product;
};
