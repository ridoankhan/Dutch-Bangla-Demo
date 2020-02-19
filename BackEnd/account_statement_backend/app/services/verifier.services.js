const Bcrypt = require('../utils/bcrypt');
const TokenHandler = require('../utils/jwt.js');

const Verifier = require('../models/verifier.model.js');

class VerifierService {
    constructor() {
        this.bcrypt = new Bcrypt();
        this.tokenHandler = new TokenHandler();

        //Binding methods with object
        this.logIn = this.logIn.bind(this);
        this.registerNew = this.registerNew.bind(this);
    }

    registerNew(req) {
        return new Promise((resolve, reject) => {

            this.bcrypt
                .getHash(req.body.password)
                .then((pass_hash) => {
                    return Verifier
                        .build({
                            name: req.body.name,
                            password: pass_hash,
                            email: req.body.email,
                        })
                        .save();
                })
                .then(response => {
                    console.log(response);
                    resolve('Verifier registration successful.');

                })
                .catch((err) => {
                    console.log(err);
                    reject('Verifier registration failed.');
                });


        });
    }

    generateId(uni_id, uni_user_id) {
        return (`${uni_id}@${uni_user_id}`)
    }

    logIn(req) {
        return new Promise((resolve, reject) => {
            let verifier = null;

            Verifier
                .findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then((response) => {
                    verifier = response;
                    console.log(verifier);

                    if (verifier) {
                        return this.bcrypt.verifyPassword(req.body.password, verifier.password)
                    }

                    reject('Invalid Email or Password');
                })
                .then(response => {
                    let token = this.tokenHandler.getToken({
                        name: verifier.name,
                        university_email: verifier.university_email
                    });
                    resolve(token);
                })
                .catch((err) => {
                    console.log(err);
                    reject('Authentication failed')
                });
        });
    }

    findByEmail(email) {
        return new Promise((resolve, reject) => {

        })
    }

    findAgentById(agent_id) {
        return new Promise((resolve, reject) => {

        });
    }


}

module.exports = VerifierService;
