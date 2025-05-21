import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  FindOptions,
  Includeable,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import slugify from 'slugify';

import { Product } from '.';

interface CategoryAttributes {
  id: string;
  name: string;
  image?: string;
  description: string;
  slug?: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id' | 'image'> {}

export default (db: Sequelize) => {
  class Category extends Model<
    InferAttributes<Category>,
    InferCreationAttributes<Category>
  > {
    declare id: CreationOptional<string>;
    declare name: string;
    declare slug: string;
    declare image: CreationOptional<string>;
    declare description: string;
  }

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
        set(value: string) {
          this.setDataValue('name', value);
          this.setDataValue('slug', slugify(value, { lower: true }));
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: 'default_category.png',
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

  Category.addHook(
    'beforeValidate',
    (category: InstanceType<typeof Category>) => {
      if (category.name) {
        category.slug = slugify(category.name);
      }
    }
  );

  return Category;
};
