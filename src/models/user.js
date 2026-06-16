'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  
  role: {
    type: DataTypes.STRING,
    defaultValue: "user"
  }

  }, {
  sequelize,
  modelName: 'User',
  tableName: 'users',   // 🔥 FORCE correct table name
  timestamps: true
});

  return User;
};