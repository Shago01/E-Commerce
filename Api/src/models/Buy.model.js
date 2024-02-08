const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Buy", {
    buyID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Total: {
      type: DataTypes.DECIMAL(10, 2),
    },
    usuarioID: {
      type: DataTypes.INTEGER,
    },
  });
};
