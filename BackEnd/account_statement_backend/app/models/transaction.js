const Sequelize = require("sequelize");

class Transaction extends Sequelize.Model {
    static init(sequelize) {
        this.model = super.init(
            {
                date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                brn: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                reference: {
                    type: Sequelize.STRING,
                },
                credit: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                debit: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                balance: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Transaction",
                tableName: "Transaction",
            },
        );
    }
}

module.exports = Transaction;
