const consola = require("consola");
const Router = require("./router.js");
const AuthController = require("../controllers/authentication.controller.js");

class AuthRoutes extends Router {
    constructor() {
        super();

        //Initialize controllers
        this.authController = new AuthController();

        try {
            this.configureRoutes();
        } catch (error) {
            consola.error(error);
        }
    }

    async configureRoutes() {
        try {
            this.router.post("/login", this.authController.logIn);
            this.router.post("/register", this.authController.register);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = AuthRoutes;
