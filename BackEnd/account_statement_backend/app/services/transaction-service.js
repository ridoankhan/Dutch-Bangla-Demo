const consola = require("consola");
const Transaction = require("../models/transaction.js");
const AccountService = require("./account-service.js");

class TransactionService {
    constructor() {
        this.accountService = new AccountService();
    }

    async findAccountInfoByDateRange({ customerId, startDate, endDate }) {
        try {
            const accountId = await this.accountService.getAccountByCustomerId(
                customerId,
            );
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
