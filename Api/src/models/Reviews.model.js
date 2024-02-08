const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      reviweID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      productID: {
        type: DataTypes.INTEGER,
      },
      usuarioID: {
        type: DataTypes.INTEGER,
      },
      punctuation: {
        type: DataTypes.DECIMAL(10, 2),
        set(value) {
          this.setDataValue("punctuation", value < 5 ? value : 5);
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance, option) => {
          instance.punctuation =
            instance.punctuation < 5 ? instance.punctuation : 5;
        },
      },
    }
  );
};
