const jwt = require("jsonwebtoken");
const config = require("../config/auth-config");
const db = require("../models/index");
const User = db.user;


const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token format' });
    }

    try {
        const decode = jwt.verify(token, config.secret);

        const user = await User.findOne({
            where: { id: decode.id }
        })

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

};


const authJwt = {
    verifyToken
};

module.exports = authJwt;