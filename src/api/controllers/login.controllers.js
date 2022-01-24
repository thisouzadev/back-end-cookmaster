const jwt = require('jsonwebtoken');
const { loginUserValidacao } = require('../services/users.services');

const JWT_SECRET = '123456';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await loginUserValidacao(email, password);
    
    const payload = {
      email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(`POST LOGIN -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  login,
};