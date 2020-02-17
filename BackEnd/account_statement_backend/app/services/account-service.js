const consola = require("consola");
const Account = require("../models/account.js");

class AccountService {
    constructor() {}

    async getAccountByCustomerId(customerId) {
        try {
            const accountNumber = await Account.findOne({
                attributes: ["accountNumber"],
                where: { customerId: customerId },
            });

            consola.info(accountNumber);
            return accountNumber;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }
}

module.exports = AccountService;
