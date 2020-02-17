const TransactionController = require("../controllers/transaction-controller.js");
const Router = require("./router.js");
const consola = require("consola");

class TransactionRouter extends Router {
    constructor() {
        super();
        this.transactionController = new TransactionController();
    }

    configureRoutes() {
        this.router.get(
            "/by-date-range",
            this.transactionController.getAccInfoByDateRange,
        );
    }
}

module.exports = TransactionRouter;
