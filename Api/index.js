const { conn } = require("./src/conn_DB");
const app = require("./src/serve.config");

const PORT = process.env.PORT || 3001;

conn.sync({ force: true });
app.listen(PORT, () => {
  console.log(`
  ✅ Servidor escuchando en el puerto ${PORT}
    ruta: http://localhost:${PORT}`);
});
