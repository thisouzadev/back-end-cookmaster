const {
  createRecipes,
  findAllRecipes,
} = require('../services/recipes.services');
const {
  success,
  created,
} = require('../utils/dictionary/statusCode');

const addRecipes = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: idUser } = req.user;
    const recipe = await createRecipes(name, ingredients, preparation, idUser);
    return res.status(created).json(recipe);
  } catch (error) {
    console.log(`POST CREATERECIPES -> ${error.message}`);
    return next(error);
  }
};
const getAllRecipes = async (req, res, next) => {
  try {
    const findAll = await findAllRecipes();
    return res.status(success).json(findAll);
  } catch (error) {
    console.log(`POST FINDRECIPES -> ${error.message}`);
    return next(error);
  }
};
module.exports = {
  addRecipes,
  getAllRecipes
};