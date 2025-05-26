import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  FindOptions,
  Includeable,
} from 'sequelize';
import { ProductImage } from '.';

interface ProductAttributes {
  id?: string;
  price: number;
  categoryId: string;
  name: string;
  description: string;
  currency: 'LYD' | 'USD';
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Price must be more than 0',
          },
        },
      },
      currency: {
        type: DataTypes.ENUM('LYD', 'USD'),
        defaultValue: 'LYD',
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { sequelize: db, modelName: 'Product' }
  );

  Product.addHook('beforeFind', (options: FindOptions<ProductAttributes>) => {
    if (!options.include) {
      options.include = [];
    } else if (!Array.isArray(options.include)) {
      options.include = [options.include];
    }

    const includeArray = options.include as Includeable[];
    const alreadyIncluded = options.include.some((include) => {
      if (typeof include === 'object' && 'model' in include) {
        return include.model === ProductImage;
      }
      return false;
    });

    if (!alreadyIncluded) {
      includeArray.push({
        model: ProductImage,
      });
    }
    options.include = includeArray;
  });

  return Product;
};
