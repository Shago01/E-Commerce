const { Router } = require("express");
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");

const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/product", productRouter);

mainRouter.get("*", (req, res) => {
  res.send("<h1>Error 404 Pagina no Encontrada</h1>");
});

module.exports = mainRouter;
