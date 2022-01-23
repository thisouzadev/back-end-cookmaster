const jwt = require('jsonwebtoken');
const { findUser } = require('../models/users.model');
const errorConstructor = require('../utils/functions/errorHandling');
const { badRequest, Unauthorized } = require('../utils/dictionary/statusCode');

const JWT_SECRET = '123456';

const authValidate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization, 'auth');

    if (!authorization) return res.status(badRequest).json({ messsage: 'missing auth token' });

    const payload = jwt.verify(authorization, JWT_SECRET);
    const user = await findUser(payload.email);
    if (!user) throw errorConstructor(badRequest, 'jwt malformed');
    req.user = user;

    return next();
  } catch (error) {
    console.log(`POST CREATAUTHORIZATION -> ${error.message}`);
    return next(errorConstructor(Unauthorized, 'jwt malformed'));
  }
};

module.exports = {
  authValidate,
};