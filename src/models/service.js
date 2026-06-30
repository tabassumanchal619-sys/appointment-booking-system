'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });

     Service.hasMany(models.Appointment, {
    foreignKey: "service_id",
});
    }
  }

  Service.init({
    service_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true
  });

  return Service;
};