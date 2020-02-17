const consola = require("consola");
const Transaction = require("../models/transaction.js");
const AccountService = require("./account-service.js");

class TransactionService {
    constructor() {
        this.accountService = new AccountService();
    }

    async findAccountInfoByDateRange({ customerId, startDate, endDate }) {
        try {
            consola.info(customerId);
            consola.info(startDate);
            consola.info(endDate);
            const accountId = await this.accountService.getAccountIdByCustomerNumber(
                customerId,
            );
            consola.info(`accountId: ${accountId}`);
            let accountOpeningBalance = await this.findAccOpeningBalance(
                accountId,
                startDate,
            );
            let transactions = await this.getAccountTxInfoByDateRange(
                accountId,
                startDate,
                endDate,
            );

            consola.info(`accountOpeningBalance: ${accountOpeningBalance}`);
            consola.info(`transactions: ${transactions}`);
            return {
                accountOpeningBalance,
                transactions,
            };
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async getAccountTxInfoByDateRange(accountId, startDate, endDate) {
        try {
            let transactions = await Transaction.findAll({
                where: {
                    accountId: accountId,
                    date: { $between: [startDate, endDate] },
                },
            });
            consola.info(transactions);
            return transactions;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async findAccOpeningBalance(accountId, date) {
        try {
            const balance = await Transaction.findOne({
                attributes: ["balance"],
                where: {
                    accountId: accountId,
                    date: date,
                },
            });

            consola.info(balance);
            return balance;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }
}

module.exports = TransactionService;