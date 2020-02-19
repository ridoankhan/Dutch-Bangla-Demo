const bcrypt = require('bcrypt');

class Bcrypt {

    constructor() {
        this.saltRounds = 10;
        this.getHash = this.getHash.bind(this);
        this.verifyPassword = this.verifyPassword.bind(this);
    }

    getHash(password) {
        return new Promise((resolve, reject) => {
            console.log(password);
            if (password == undefined || '')
                reject(`'Password' required`);
            bcrypt
                .hash(password, this.saltRounds)
                .then(hash => { resolve(hash) })
                .catch(err => { reject(err) });
        })
    }

    verifyPassword(password, hash) {
        return new Promise((resolve, reject) => {
            console.log('inside pass verification');
            console.log(password);
            console.log(hash);
            if (!password) reject('Password Empty');
            bcrypt
                .compare(password, hash)
                .then(result => {
                    console.log(result);
                    if (result) resolve(true);
                    reject(false);
                });
        });

    }
}

module.exports = Bcrypt;