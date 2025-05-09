import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';

import AppError from '../utils/appError';
import Role from '../enums/roles';

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  picture?: string;
  role?: Role;
  passwordChangedAt: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'picture'> {}

export default (db: Sequelize) => {
  class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
  {
    public id!: string;
    public email!: string;
    public username!: string;
    public password!: string;
    public passwordConfirm!: string;
    public role!: Role;
    public passwordChangedAt!: Date;
    public changedPasswordAfter!: (jwtIat: number) => boolean;

    public comparePassword!: (plain: string) => Promise<Boolean>;
  }

  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email provided is not valid!',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 32],
        },
      },
      passwordConfirm: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          isConfirmed(value: string) {
            if (value !== this.password) {
              throw new AppError(
                `Password & Password Confirm fields don't match`,
                400
              );
            }
          },
        },
      },
      passwordChangedAt: {
        type: DataTypes.DATE,
        defaultValue: () => new Date(),
      },
      picture: {
        type: DataTypes.STRING,
        defaultValue: 'default.jpg',
      },
      role: {
        type: DataTypes.ENUM(...Object.values(Role)),
        defaultValue: Role.User,
        validate: {
          isIn: {
            args: [Object.values(Role)],
            msg: 'Invalid role!',
          },
        },
      },
    },
    {
      sequelize: db,
      modelName: 'User',
    }
  );

  User.addHook('beforeSave', async (user: User, options) => {
    if (user.changed('password' as keyof User)) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.prototype.comparePassword = async function (plain: string) {
    return await bcrypt.compare(plain, this.password);
  };

  User.prototype.changedPasswordAfter = function (jwtIat: number) {
    if (this.passwordChangedAt) {
      return this.passwordChangedAt.getTime() / 1000 > jwtIat;
    }

    return false;
  };

  return User;
};
