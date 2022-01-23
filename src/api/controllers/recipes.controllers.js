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
    const { name, ingredients, preparation } = req.body;
    const { _id: idUser } = req.user;
    const recipe = await createRecipes(name, ingredients, preparation, idUser);
    return res.status(created).json(recipe);
  } catch (error) {
    console.log(`POST CREATERECIPES -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  addRecipes,
};