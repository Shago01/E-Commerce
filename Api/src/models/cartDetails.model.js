const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("CartDetails", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    priceU: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    subTotal: {
      type: DataTypes.INTEGER,
    },
  });
};
