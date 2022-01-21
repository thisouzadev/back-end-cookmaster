const jwt = require('jsonwebtoken');
const { loginUser } = require('../services/users.services');

const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    const payload = {
      email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json(token || result);
  } catch (error) {
    console.log(`POST LOGIN -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  login,
};