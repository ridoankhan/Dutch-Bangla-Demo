const Sequelize = require("sequelize");

class VerifierModel extends Sequelize.Model {
    static init(sequelize) {
        this.model = super.init(
            {
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Verifier",
                tableName: "Verifier",
            },
        );
    }
}

module.exports = VerifierModel;
