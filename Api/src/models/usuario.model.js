const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  sequelize.define(
    "Usuario",
    {
      usuarioID: {
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
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rolID: {
        type: DataTypes.INTEGER,
      },
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = bcrypt.hashSync(instance.password, 10);
        },
      },
    }
  );
};
