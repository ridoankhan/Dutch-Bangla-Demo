const consola = require("consola");
const Bcrypt = require("../utils/bcrypt");
const TokenHandler = require("../utils/jwt.js");
const emailValidator = require("email-validator");
const Verifier = require("../models/verifier.model.js");

class VerifierService {
    constructor() {
        this.bcrypt = new Bcrypt();
        this.tokenHandler = new TokenHandler();

        //Binding methods with object
        this.logIn = this.logIn.bind(this);
        this.registerNew = this.registerNew.bind(this);
    }

    async registerNew({ name, email, password }) {
        try {
            consola.info("VerifierService.registerNew");
            const hashedPassword = await this.bcrypt.getHash(password);
            if (!emailValidator.validate(email)) {
                throw new Error("Not a valid email address");
            }

            const verifier = Verifier.build({
                name,
                email,
                password: hashedPassword,
            }).save();

            return "Verifier Registration Successful.";
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }

    async logIn({ email, password }) {
        try {
            consola.info(email);
            consola.info(password)
            const verifier = await Verifier.findOne({
                where: { email: email },
            });

            if (!verifier) {
                throw new Error("Email is not registered as verifier!");
            }

            const isValidPassword = await this.bcrypt.verifyPassword(
                password,
                verifier.password,
            );

            if (isValidPassword) {
                const token = this.tokenHandler.getToken({ email });
                return token;
            }

            throw new Error("Could not get token");
        } catch (error) {
            consola.error(error);
            throw error;
        }
    }
}

module.exports = VerifierService;