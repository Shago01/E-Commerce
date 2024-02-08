const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      productID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priceUnit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        set(value) {
          this.setDataValue("discount", value < 100 ? value : 100);
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reviewCount: {
        type: DataTypes.INTEGER,
      },
      reviewAcum: {
        type: DataTypes.DECIMAL(10, 2),
      },
      rating: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      inStock: {
        type: DataTypes.BOOLEAN,
      },
      details: {
        type: DataTypes.TEXT,
      },
      typeProductID: {
        type: DataTypes.INTEGER,
      },
      usuarioID: {
        type: DataTypes.INTEGER,
      },
    },
    {
      Hooks: {
        beforeCreate: (instance, options) => {
          instance.discount = instance.discount < 100 ? instance.discount : 100;
        },

        beforeUpdate: (instance, options) => {
          instance.isStock = instance.stock === 0 ? false : true;
        },
      },
    }
  );
};
