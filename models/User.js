"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      access_token: {
        type: DataTypes.STRING,
      },
      access_token: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      otp: {
        type: DataTypes.JSONB,
        defaultValue: {
          code: 0,
          expires: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
    }
  );
  return User;
};
