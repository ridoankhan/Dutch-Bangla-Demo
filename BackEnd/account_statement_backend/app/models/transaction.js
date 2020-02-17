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
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                reference: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                credit: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                debit: {
                    type: Sequelize.STRING,
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
