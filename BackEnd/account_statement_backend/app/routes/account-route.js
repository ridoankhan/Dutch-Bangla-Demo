const AccountController = require("../controllers/account-controller.js");
const Router = require("./router.js");

const consola = require("consola");

class AccountRouter extends Router {
    constructor() {
        super();
        this.accountController = new AccountController();
    }

    configureRoutes() {}
}

module.exports = AccountRouter;
