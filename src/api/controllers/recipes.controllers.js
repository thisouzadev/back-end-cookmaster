const {
  createRecipes,
  findAllRecipes,
  findByIdOneRecipe,
  updateRecipeById,
  excludeRecipeById,
  uploadImageMulter,
} = require('../services/recipes.services');
const {
  success,
  created,
  noContent,
} = require('../utils/dictionary/statusCode');

const addRecipes = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: idUser } = req.user;
    const recipe = await createRecipes(name, ingredients, preparation, idUser);
    return res.status(created).json(recipe);
  } catch (error) {
    console.log(`POST CREATERECIPE -> ${error.message}`);
    return next(error);
  }
};
const getAllRecipes = async (req, res, next) => {
  try {
    const findAll = await findAllRecipes();
    return res.status(success).json(findAll);
  } catch (error) {
    console.log(`GET FINDRECIPES -> ${error.message}`);
    return next(error);
  }
};
const getByIdRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await findByIdOneRecipe(id);

    if (recipe.error) return next(recipe.error);
    return res.status(success).json(recipe);
  } catch (error) {
    console.log(`POST FINDBYIDRECIPE -> ${error.message}`);
    return next(error);
  }
};
const updateRecipe = async (req, res, next) => {
  try {
    const { params: { id }, body: recipe, user: { _id } } = req;

    await updateRecipeById(id, recipe);

    res.status(200).json({ _id: id, ...recipe, userId: _id });
  } catch (error) {
    console.log(`PUT UPDATERECIPE -> ${error.message}`);
    next(error);
  }
};
const excludeRecipe = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipe = await excludeRecipeById(id);
    return res.status(noContent).json(recipe);
  } catch (error) {
    console.log(`DELETE DELETERECIPE -> ${error.message}`);
    return next(error);
  }
};

const uploadImageRecipe = async (req, res, next) => {
try {
  const { id } = req.params;
  const { filename } = req.file;
  await uploadImageMulter(id, filename);
  const recipe = await getByIdRecipe(id);
  return res.status(success).json(recipe);
} catch (error) {
  console.log(`PUT UPLOADIMAGERECIPE -> ${error.message}`);
    return next(error);
}
};

module.exports = {
  addRecipes,
  getAllRecipes,
  getByIdRecipe,
  updateRecipe,
  excludeRecipe,
  uploadImageRecipe,
};