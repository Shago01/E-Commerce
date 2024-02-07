const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.status(200).send("Estoy en users del ecommerce");
});

module.exports = userRouter;
