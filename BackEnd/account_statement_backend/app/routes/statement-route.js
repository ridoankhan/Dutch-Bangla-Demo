const StatementController = require("../controllers/account-statement-controller.js");
const Router = require("./router.js");
const consola = require("consola");

class TransactionRouter extends Router {
    constructor() {
        super();
        this.statementController = new StatementController();
    }

    async configureRoutes() {
        try {
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getRouter() {
        return this.router;
    }
}

module.exports = TransactionRouter;
