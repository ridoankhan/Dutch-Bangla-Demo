const express = require("express");
const consola = require("consola");

class Router {
    constructor() {
        this.router = express.Router();
    }

    async configureRoutes() {
        try {
            this.router.use((req, res, next) => {
                res.status(404).json("No route found!");
            });

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    getRouter() {
        return this.router;
    }
}

module.exports = Router;
