const express = require("express");

class Router {
    constructor() {
        this.router = express.Router();

        //Binding all functions with object
        this.getRouter = this.getRouter.bind(this);
        // this.setSubRoutes = this.setSubRoutes.bind(this);
        // this.configureRoutes = this.configureRoutes.bind(this);
    }

    async configureRoutes() {}

    getRouter() {
        return this.router;
    }
}

module.exports = Router;
