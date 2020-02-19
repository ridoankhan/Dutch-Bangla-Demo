const AuthService = require("../services/verifier.services.js");
const consola = require("consola");

class AuthController {
    constructor() {
        this.universityService = new UniversityService();
        this.uniAuthorityService = new UniAuthorityService();

        //binding methods with object
        this.logIn = this.logIn.bind(this);
        this.register = this.register.bind(this);
    }

    async register(req, res, next) {
        try {
        } catch (error) {}

        console.log("register");
        this.uniAuthorityService
            .registerNew(req)
            .then(response => {
                res.status(201).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }

    logIn(req, res, next) {
        this.uniAuthorityService
            .logIn(req)
            .then(token => {
                res.status(201).json({ token: token });
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
}

module.exports = AuthController;
