const { Router } = require("express");
const path = require("path");

const productRouter = Router();

// todas las rutas

productRouter.get("/", (req, res) => {
  const file = path.resolve(__dirname, "../static/product.html");
  res.sendFile(file);
});

//  export para que pueda ser llamado desde main

module.exports = productRouter;

// Agregando algo aca para ver si cambio algo
