const {
  createUsers,
} = require('../services/users.services');
const {
  // succes,
  created,
} = require('../utils/dictionary/statusCode');

const addUsers = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await createUsers(name, email, password);
    return res.status(created).json(result);
  } catch (error) {
    console.log(`POST CREATEUSERS -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  addUsers,
};