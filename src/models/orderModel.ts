import {
  DataTypes,
  FindOptions,
  Includeable,
  Model,
  Optional,
  Sequelize,
} from 'sequelize';
import { Item } from '.';

interface OrderAttributes {
  id?: string;
  userId?: string;
  itemId?: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

export default (db: Sequelize) => {
  class Order extends Model<OrderAttributes, OrderCreationAttributes> {}

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
      },
      itemId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize: db,
      modelName: 'Order',
    }
  );

  Order.addHook('beforeFind', (options: FindOptions<OrderAttributes>) => {
    if (!options.include) {
      options.include = [];
    } else if (!Array.isArray(options.include)) {
      options.include = [options.include];
    }

    const includeArray = options.include as Includeable[];
    const alreadyIncluded = options.include.some((include) => {
      if (typeof include === 'object' && 'model' in include) {
        return include.model === Item;
      }
      return false;
    });

    if (!alreadyIncluded) {
      includeArray.push({
        model: Item,
      });
    }
    options.include = includeArray;
  });

  return Order;
};
