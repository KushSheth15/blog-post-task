const express = require('express');
const { register,login} = require('../controllers/user-controller');
const {USER_ROUTES} = require('../constants/endpoint');
const router = express.Router();

router.post(USER_ROUTES.REGISTER, register);

router.post(USER_ROUTES.LOGIN, login);

module.exports = router;