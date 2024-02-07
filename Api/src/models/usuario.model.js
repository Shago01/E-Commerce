const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Usuario", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firsApell: {
      type: DataTypes.STRING,
      allwNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pasword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
