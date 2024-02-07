const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Image", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    route: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
