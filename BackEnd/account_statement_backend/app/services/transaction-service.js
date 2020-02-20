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
            startDate += " 23:59:59";
            endDate += " 23:59:59";

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

            let accountInfo = [];
            accountInfo.push(accountOpeningBalance);
            transactions.forEach(tx => {
                accountInfo.push(tx);
            });
            return {
                accountInfo,
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
                WHERE accountId = :currAccId
                AND date BETWEEN :start and :end`, {
                    replacements: {
                        currAccId: accountId,
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
                 AND date <= :openingDate`, {
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
            //accOpeningDate = accOpeningDate[accOpeningDate.length - 1].date;

            const balance = await Transaction.sequelize.query(
                `SELECT balance, date
                FROM Transaction
                WHERE accountId = :selectedAccId
                AND
                    date=:openingDate`, {
                    replacements: {
                        selectedAccId: accountId,
                        openingDate: accOpeningDate,
                    },
                    type: QueryTypes.SELECT,
                },
            );
            consola.info(balance);
            if (balance.length > 0) {
                return {
                    id: null,
                    date: balance[balance.length - 1].date,
                    brn: null,
                    description: "Opening Balance",
                    reference: "",
                    credit: balance[balance.length - 1].balance,
                    debit: 0,
                    balance: balance[balance.length - 1].balance,
                    accountId: accountId,
                };
            }
            throw new Error("No transaction found within given date range.");
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }
}

module.exports = TransactionService;