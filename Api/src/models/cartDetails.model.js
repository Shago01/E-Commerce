const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "CartDetails",
    {
      cartDetailsID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      priceU: {
        type: DataTypes.DECIMAL(10, 2),
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      subTotal: {
        type: DataTypes.DECIMAL(10, 2),
      },
      cartID: {
        type: DataTypes.INTEGER,
      },
      productID: {
        type: DataTypes.INTEGER,
      },
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          instance.subTotal = instance.quantity + instance.priceU;
        },
      },
    }
  );
};
