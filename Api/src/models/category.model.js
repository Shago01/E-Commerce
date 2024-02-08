const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Category", {
    categoryID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defalutValue: "producto X",
    },
  });
};
