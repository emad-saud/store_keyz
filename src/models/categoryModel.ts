import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface CategoryAttributes {
  id: string;
  name: string;
  image?: string;
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
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: 'default_category.jpg',
      },
    },
    {
      sequelize: db,
      modelName: 'Category',
    }
  );

  return Category;
};
