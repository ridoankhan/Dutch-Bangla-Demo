const consola = require("consola");
const AccountService = require("../services/account-service.js");

class AccountController {
    constructor() {
        this.accountService = new AccountService();
    }

    async findByCustomerNumber(req, res, next) {
        try {
            const accountNumber = await this.accountService.getAccountByCustomerId(
                req.params.customerId,
            );

            res.status(201).json({ accountNumber: accountNumber });
        } catch (error) {
            consola.error(error);
            res.status(500).json(error);
        }
    }
}

module.exports = AccountController;
