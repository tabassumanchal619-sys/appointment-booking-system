'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.User, { foreignKey: "user_id" });
      Appointment.belongsTo(models.Service, { foreignKey: "service_id" });
    }
  }

  Appointment.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    time: {
      type: DataTypes.TIME,
      allowNull: false
    },

status: {
    type: DataTypes.ENUM(
        "pending",
        "approved",
        "rejected",
        "completed",
        "cancelled"
    ),
    defaultValue: "pending",
    allowNull: false
}

  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    timestamps: true
  });

  return Appointment;
};