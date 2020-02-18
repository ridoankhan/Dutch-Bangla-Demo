const consola = require("consola");
const Account = require("../models/account.js");
const Customer = require("../models/customer.js");

class AccountService {
    constructor() {}

    async getAccountByCustomerId(customerId) {
        try {
            const account = await Account.findOne({
                attributes: ["accountNumber"],
                where: { customerId: customerId },
                include: [
                    {
                        model: Customer,
                        attributes: ["id", "customerName", "address"],
                        as: "customer",
                    },
                ],
            });

            consola.info(account);
            return account;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async getAccountIdByCustomerNumber(customerId) {
        try {
            const account = await Account.findOne({
                attributes: ["id"],
                where: { customerId: customerId },
            });
            return account.id;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }
}

module.exports = AccountService;
