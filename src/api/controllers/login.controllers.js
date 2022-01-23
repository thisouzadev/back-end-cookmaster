const jwt = require('jsonwebtoken');
const { loginUser } = require('../services/users.services');

const JWT_SECRET = '123456';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validacao = await loginUser(email, password);
    console.log(validacao, 'controler');
    
    const payload = {
      email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });

    return res.status(200).json(token || validacao);
  } catch (error) {
    console.log(`POST LOGIN -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  login,
};