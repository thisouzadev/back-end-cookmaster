const {
  createRecipes,
} = require('../services/recipes.services');
const {
  // succes,
  created,
} = require('../utils/dictionary/statusCode');

const addRecipes = async (req, res, next) => {
  try {
    console.log(req.user);
    const { _id: id } = req.user;
    const { name, ingredients, preparation } = req.body;
    const recipe = await createRecipes(name, ingredients, preparation, id);
    return res.status(created).json(recipe);
  } catch (error) {
    console.log(`POST CREATERECIPES -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  addRecipes,
};