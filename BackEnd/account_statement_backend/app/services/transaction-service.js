const consola = require("consola");
const Transaction = require("../models/transaction.js");
const AccountService = require("./account-service.js");
const { QueryTypes } = require("sequelize");

class TransactionService {
    constructor() {
        this.accountService = new AccountService();
    }

    async findAccountInfoByDateRange({ customerId, startDate, endDate }) {
        try {
            consola.info("TransactionService.findAccountInfoByDateRange");
            consola.info(`customerId: ${customerId}`);
            consola.info(`startDate: ${startDate}`);
            consola.info(`endDate: ${endDate}`);
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
            consola.info(accountId);
            consola.info(startDate);
            consola.info(endDate);

            // let transactions = await Transaction.findAll({
            //     where: {
            //         accountId: accountId,
            //         date: { $between: [startDate, endDate] },
            //     },
            // });

            let transactions = await Transaction.sequelize.query(
                `SELECT * from Transaction
                WHERE accountId = 1
                AND date BETWEEN :start and :end`,
                {
                    replacements: {
                        start: startDate,
                        end: endDate,
                    },
                    type: QueryTypes.SELECT,
                },
            );
            consola.info(transactions);
            return transactions;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async findAccOpeningBalance(accountId, date) {
        try {
            let accOpeningDate = await Transaction.sequelize.query(
                `SELECT max(date) as date
                 FROM Transaction
                 WHERE accountId = :selectedAccId
                 AND date <= :openingDate`,
                {
                    replacements: {
                        selectedAccId: accountId,
                        openingDate: date,
                    },
                    type: QueryTypes.SELECT,
                },
            );

            accOpeningDate = JSON.stringify(
                accOpeningDate[accOpeningDate.length - 1].date,
            )
                .replace("T", " ")
                .split(".")[0]
                .replace('"', "");

            consola.info(accOpeningDate);
            consola.info(typeof accOpeningDate);

            const balance = await Transaction.sequelize.query(
                `SELECT balance
                FROM Transaction
                WHERE accountId = :selectedAccId
                AND
                    date=:openingDate`,
                {
                    replacements: {
                        selectedAccId: accountId,
                        openingDate: accOpeningDate,
                    },
                    type: QueryTypes.SELECT,
                },
            );

            return balance[balance.length - 1].balance;
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }
}

module.exports = TransactionService;
