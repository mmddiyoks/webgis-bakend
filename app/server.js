const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const { allRouted } = require("./routers/router");
const { sequelize } = require("../models/index");

const createError = require("http-errors");
const { Client } = require("pg");
//server applicaton config
class Appliation {
  #express = require("express");
  #app = this.#express();
  #PORT;
  constructor(PORT) {
    this.#PORT = PORT;
    this.configApplication();
    this.createServer();
    this.createRoutes();
    this.connectToPostgreSQL();
    this.errorHandler();
  }
  configApplication() {
    const path = require("path");
    this.#app.use(cookieParser());
    // this.#app.use(morgan("dev"));
    this.#app.use(this.#express.json());
    this.#app.use(
      cors({
        origin: "*",
        optionsSuccessStatus: 200,
        credentials: true,
      })
    );

    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/restapi",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJSDoc({
          swaggerDefinition: {
            info: {
              title: "web-gis(2023)",
              version: "1.0.0",
              description: "Developed By mmddiyoks (2023)",
              contact: {
                name: "Turk Zoom",
                url: "https://web-gis.com/",
              },
            },

            servers: [
              {
                url: ["http://localhost:4500", "https://web-gis.com/rest"],
              },
            ],
          },
          apis: ["./app/routers/**/*.js"],
        })
      )
    );
  }
  createServer() {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(this.#PORT, () => {
      console.log(`server run > on port ${this.#PORT}`);
    });
  }

  connectToPostgreSQL = async () => {
    console.log("Checking database connection...");

    try {
      await sequelize.authenticate();
      console.log("Database connection established.");
    } catch (e) {
      console.log("Database connection failed", e);
      process.exit(1);
    }
  };

  errorHandler() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد"));
    });
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Route or url is not found",
      });
    });
    this.#app.use((error, req, res, next) => {
      console.log(error);
      const status = error?.status || 500;
      const message = error?.message || "Internal server error";
      res.status(status).json({
        status,
        success: false,
        message,
      });
    });
  }
  createRoutes() {
    this.#app.use(allRouted);
  }
}

module.exports = Appliation;
