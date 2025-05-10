import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

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

  return Order;
};
