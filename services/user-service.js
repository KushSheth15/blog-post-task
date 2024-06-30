const db = require("../models/index");
const bcrypt = require("bcryptjs");
const authUtils = require("../utils/auth-utils");

const registerUser = async (username, email, password) => {
    try {
        const userExists = await db.user.findOne({ where: { email } });

        if (userExists) {
            throw new Error('User is Exists');
        }

        const hashedPassword = await bcrypt.hash(password, 15);
        const newUser = await db.user.create({ username, email, password: hashedPassword });
        return newUser;
    } catch (err) {
        throw err;
    }
}

const loginUser = async (email, password) => {
    try {

        const user = await db.user.findOne({ where: { email } });
        if (!user) {
            throw new Error('Email not found');
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if(!passwordValid){
            throw new Error("Password is invalid");
        }

        const token = authUtils.generateToken({ id: user.id });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token,
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    registerUser,
    loginUser,
};