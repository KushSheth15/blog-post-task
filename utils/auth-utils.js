const expiresIn = process.env.TOKEN_EXPIRATION
const jwt = require("jsonwebtoken");
const auth_config = require("../config/auth-config");

const generateToken = (payload) => {
    return jwt.sign(payload, auth_config.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: expiresIn, 
    });
};

const generateResetToken = (payload) => {
    return jwt.sign(payload, auth_config.secret, { expiresIn });
};

module.exports = {
    generateToken,
    generateResetToken
};
