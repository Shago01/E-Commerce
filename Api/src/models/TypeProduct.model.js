const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("TypeProduct", {
    typeProductID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defalutValue: "producto X",
    },
    categoryID: {
      type: DataTypes.INTEGER,
    },
  });
};
