import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  Includeable,
  FindOptions,
} from 'sequelize';

import { Product } from '../models';

interface ItemAttributes {
  id: string;
  productId: string;
  valid: boolean;
  content: string;
  soldAt: Date;
}
interface ItemCreationAttributes extends Optional<ItemAttributes, 'id'> {}
export default (db: Sequelize) => {
  class Item extends Model<ItemAttributes, ItemCreationAttributes> {
    public id!: string;
    public productId!: string;
    public valid!: boolean;
    public content!: string;
    public soldAt!: Date;
  }

  Item.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      soldAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize: db,
      modelName: 'Item',
      indexes: [
        {
          unique: true,
          fields: ['productId', 'content'],
        },
      ],
    }
  );

  Item.addHook('beforeFind', (options: FindOptions<ItemAttributes>) => {
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

  return Item;
};
