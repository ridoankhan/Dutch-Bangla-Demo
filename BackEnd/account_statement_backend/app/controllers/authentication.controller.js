const consola = require("consola");
const AuthService = require("../services/verifier.services.js");

class AuthController {
    constructor() {
        this.authService = new AuthService();

        //binding methods with object
        this.logIn = this.logIn.bind(this);
        this.register = this.register.bind(this);
    }

    async register(req, res, next) {
        try {
            consola.info("AuthController.register()");
            const message = await this.authService.registerNew(req.body);
            res.status(210).json({ message: message });
        } catch (error) {
            console.log();

            consola.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    async logIn(req, res, next) {
        try {
            consola.info("AuthController.logIn()");
            const token = await this.authService.logIn(req.body);
            res.status(201).json({ token });
        } catch (error) {
            consola.error(error);
            res.status(500).json(error);
        }
    }
}

module.exports = AuthController;
