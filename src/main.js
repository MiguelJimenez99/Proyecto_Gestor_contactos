const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chalk = require("chalk");

const logger = require("./middlewares/loggers.middleware");
const errorHadler = require("./middlewares/errorhadler.middleware");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

const authRoutes = require("./routes/auth.routes");
const contactRoutes = require("./routes/contact.routes");

app.use("/api/auth", authRoutes);
app.use("/api/", contactRoutes);

//manejador de errores
app.use(errorHadler);

//conexion a la base de datos y el puerto de escucha
const PORT = process.env.PORT;
const URL_DATABASE = process.env.URL_DATABASE;

mongoose
  .connect(URL_DATABASE)
  .then(() => {
    console.log(chalk.green("Conectado correctamente a MongoDB"));
  })
  .catch((error) => {
    console.log(chalk.red(`Error al conectarse a la base de datos: ${error}`));
  });

app.listen(PORT, () => {
  console.log(chalk.yellow(`Servidor corriendo en http://localhost:${PORT}`));
});
