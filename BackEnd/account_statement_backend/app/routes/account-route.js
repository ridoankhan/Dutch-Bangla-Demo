const AccountController = require("../controllers/account-controller.js");
const Router = require("./router.js");

const consola = require("consola");

class AccountRouter extends Router {
    constructor() {
        super();
        this.accountController = new AccountController();
        try {
            this.configureRoutes();
        } catch (error) {
            consola.error(error);
        }
    }

    async configureRoutes() {
        try {
            this.router.get(
                "/:customerId",
                this.accountController.findByCustomerNumber,
            );
        } catch (error) {
            console.log(error);

        }
    }
}

module.exports = AccountRouter;