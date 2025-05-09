import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface ItemAttributes {
  id: string;
  productId: string;
  valid: boolean;
}
interface ItemCreationAttributes extends Optional<ItemAttributes, 'id'> {}
export default (db: Sequelize) => {
  class Item extends Model<ItemAttributes, ItemCreationAttributes> {}

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
      valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize: db,
      modelName: 'Item',
    }
  );

  return Item;
};
