/**
 * jsonwebtoken is used for tokenization
 *
 */

const jwt = require('jsonwebtoken');

class TokenHandler {

    constructor() {
        this.privateKey = process.env.JWT_KEY;
        this.expiration = { expiresIn: '1h' };
    }

    getToken(payload) {
        return jwt.sign(payload, this.privateKey, this.expiration);
    }

    verifyToken(token) {
        console.log('inside verifier');
        return jwt.verify(token, this.privateKey);
    }
}

module.exports = TokenHandler;