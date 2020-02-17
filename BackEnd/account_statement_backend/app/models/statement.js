const Sequelize = require("sequelize");

class Statement extends Sequelize.Model {
    static init(sequelize) {
        this.model = super.init(
            {
                startDate: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                endDate: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                tx_hash: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Statement",
                tableName: "Statement",
            },
        );
    }
}

module.exports = Statement;
