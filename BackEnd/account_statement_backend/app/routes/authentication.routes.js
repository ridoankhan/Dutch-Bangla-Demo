const Router = require('./router.js');
const AuthController = require('../controllers/authentication.controller.js');

class AuthRoutes extends Router {

    constructor() {
        super();

        //Initialize controllers
        this.authController = new AuthController();

        //setting up routes
        this.setRoutes();

    }

    setRoutes() {

        //handling post requests
        this.router.post('/login', this.authController.logIn);
        this.router.post('/register', this.authController.register);
    }

}

module.exports = AuthRoutes;