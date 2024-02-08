const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("BuyDetails", {
    buyDetailsID: {
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
    buyID: {
      type: DataTypes.INTEGER,
    },
  });
};
