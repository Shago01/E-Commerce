// ! configuración del servidor
// ? importaciónes
const express = require("express");
const expressFile = require("express-fileupload");
const http = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const mainRouter = require("./routes/main.routes");

// ? instanciación
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ? Agregando middleware
app.use(morgan("dev"));
app.use(expressFile());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/static"));

app.use(mainRouter);

//* Aca se va a realizar posteriormente la configuración del la parte del servidor asociado con webSocket

module.exports = app;
