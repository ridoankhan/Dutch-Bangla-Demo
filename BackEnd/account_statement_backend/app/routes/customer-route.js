const CustomerController = require("../controllers/customer-controller.js");
const Router = require("./router.js");
const consola = require("consola");

class CustomerRouter extends Router {
    constructor() {
        super();
        this.customerController = new CustomerController();
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

module.exports = CustomerRouter;
