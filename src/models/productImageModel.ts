import { Model, DataTypes, Sequelize } from 'sequelize';

interface ImageAttributes {
  id: string;
  name: string;
  productId: string;
}

export default (db: Sequelize) => {
  class ProductImage extends Model<ImageAttributes> {}

  ProductImage.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      productId: {
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize: db, modelName: 'ProductImage' }
  );
};
