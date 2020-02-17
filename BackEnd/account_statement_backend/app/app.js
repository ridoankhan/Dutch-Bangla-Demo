const cors = require("cors");
const helmet = require("helmet");
const consola = require("consola");
const express = require("express");
const bodyParser = require("body-parser");

const Router = require("./routes/root-route.js");
const DbConfigurator = require("./configs/db-config.js");

class App {
    constructor() {
        this.app = express();
        this.router = new Router();
        this.dbConfigurator = new DbConfigurator();
    }

    async configure() {
        try {
            this.app.use(cors());
            this.app.use(helmet());
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: true }));

            await this.router.configureRoutes();
            await this.dbConfigurator.configure();

            this.app.use("/", this.router.getRouter());
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    getApp() {
        return this.app;
    }
}

module.exports = App;
