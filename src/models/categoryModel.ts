import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  FindOptions,
  Includeable,
} from 'sequelize';
import { Product } from '.';

interface CategoryAttributes {
  id: string;
  name: string;
  image?: string;
  description: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id' | 'image'> {}

export default (db: Sequelize) => {
  class Category extends Model<
    CategoryAttributes,
    CategoryCreationAttributes
  > {}

  Category.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: 'default_category.jpg',
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: 'Category',
    }
  );

  Category.addHook('beforeFind', (options: FindOptions<CategoryAttributes>) => {
    if (!options.include) {
      options.include = [];
    } else if (!Array.isArray(options.include)) {
      options.include = [options.include];
    }

    const includeArray = options.include as Includeable[];
    const alreadyIncluded = options.include.some((include) => {
      if (typeof include === 'object' && 'model' in include) {
        return include.model === Product;
      }
      return false;
    });

    if (!alreadyIncluded) {
      includeArray.push({
        model: Product,
      });
    }
    options.include = includeArray;
  });

  return Category;
};
