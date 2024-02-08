require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/e-commerce-db`,
  {
    logging: false,
    native: false,
    debug: true,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

//  * Para relacionarlos hacemos un destructuring

const {
  Buy,
  BuyDetails,
  Cart,
  CartDetails,
  Category,
  Image,
  Product,
  Review,
  Rol,
  TypeProduct,
  Usuario,
} = sequelize.models;

// * Acá van las relaciones

// * Producto Relaciones

Product.hasMany(Image, { foreignKey: "productID" });
Image.belongsTo(Product, { foreignKey: "productID" });

Product.hasMany(Review, { foreignKey: "productID" });
Review.belongsTo(Product, { foreignKey: "productID" });

Product.hasOne(CartDetails, { foreignKey: "productID" });
CartDetails.belongsTo(Product, { foreignKey: "productID" });

// * categoría relaciones

Category.hasMany(TypeProduct, { foreignKey: "categoryID" });
TypeProduct.belongsTo(Category, { foreignKey: "categoryID" });

TypeProduct.hasMany(Product, { foreignKey: "typeProductID" });
Product.belongsTo(TypeProduct, { foreignKey: "typeProductID" });

// * Usuario Relaciónes

Usuario.hasMany(Image, { foreignKey: "usuarioID" });
Image.belongsTo(Usuario, { foreignKey: "usuarioID" });

Usuario.hasMany(Product, { foreignKey: "usuarioID" });
Product.belongsTo(Usuario, { foreignKey: "usuarioID" });

Usuario.hasMany(Review, { foreignKey: "usuarioID" });
Review.belongsTo(Usuario, { foreignKey: "usuarioID" });

Usuario.hasMany(Buy, { foreignKey: "UsuarioID" });
Buy.belongsTo(Usuario, { foreignKey: "UsuarioID" });

Usuario.hasOne(Cart, { foreignKey: "usuarioID" });
Cart.belongsTo(Usuario, { foreignKey: "usuarioID" });

// * Compras relaciones

Buy.hasMany(BuyDetails, { foreignKey: "buyID" });
BuyDetails.belongsTo(Buy, { foreignKey: "buyID" });

Rol.hasMany(Usuario, { foreignKey: "rolID" });
Usuario.belongsTo(Rol, { foreignKey: "rolID" });

Cart.hasMany(CartDetails, { foreignKey: "cartID" });
CartDetails.belongsTo(Cart, { foreignKey: "cartID" });

// * Acá van los Hooks

CartDetails.beforeCreate(async (cartDetails) => {
  try {
    const cartUse = await Cart.findByPk(cartDetails.cartID);
    const productUse = await Product.findByPk(cartDetails.productID);

    cartDetails.priceU = productUse.priceUnit * (1 - productUse.discount);

    cartDetails.subTotal = cartDetails.priceU * cartDetails.quantity;

    cartUse.total += cartDetails.subTotal;

    await cartUse.save();
  } catch (error) {
    console.log("❌ Error al tratar de Crear Un detalle de Carrito", error);
  }
});

CartDetails.beforeUpdate(async (cartDetailsUpdate) => {
  try {
    if (cartDetailsUpdate.changed("quantity")) {
      cartDetailsUpdate.subTotal =
        cartDetailsUpdate.priceU * cartDetailsUpdate.quantity;

      const subtotalDifference =
        cartDetailsUpdate.subTotal -
        cartDetailsUpdate._previousDataValues.subTotal;

      cartUse.total += subtotalDifference;

      await cartUse.save();
    }
  } catch (error) {
    console.log(
      "❌ Error al tratar de Actualizar Un detalle de Carrito",
      error
    );
  }
});

Review.afterCreate(async (createReview) => {
  try {
    const productUse = await Product.findByPk(createReview.productID);

    await productUse.increment("reviewCount");
    productUse.reviewAcum += createReview.punctuation;
    productUse.rating = productUse.reviewAcum / productUse.reviewCount;

    await productUse.save();
  } catch (error) {
    console.log(
      "❌ Error al tratar de actializar los datos de productos tras crear una reseña",
      error
    );
  }
});

console.log(
  `Modelos en la Base de Datos: 💻 \n${Object.keys(sequelize.models).join(
    ", "
  )}`
);

// * exportación de la coneción y relaciones
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
