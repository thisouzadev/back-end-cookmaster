const jwt = require('jsonwebtoken');
const { findUser } = require('../models/users.model');
const errorConstructor = require('../utils/functions/errorHandling');
const { badRequest, Unauthorized } = require('../utils/dictionary/statusCode');

const { JWT_SECRET } = process.env;

const authValidate = async (req, res, next) => {
  try {
  const { authorization } = req.headers;
console.log(authorization, 'auth');
  if (!authorization) throw errorConstructor(badRequest, 'missing auth token');

    const payload = jwt.verify(authorization, JWT_SECRET);
    const user = await findUser(payload.email);
    if (!user) throw errorConstructor(badRequest, 'jwt malformed');
    req.user = user;

    return next();
  } catch (error) {
    console.log(`POST CREATAUTHORIZATION -> ${error.message}`);
    return errorConstructor(Unauthorized, 'jwt malformed');
  }
};

module.exports = {
  authValidate,
};