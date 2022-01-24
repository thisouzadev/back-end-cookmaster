const Joi = require('@hapi/joi');
const { create, findAll, findById } = require('../models/recipes.model');
const errorConstructor = require('../utils/functions/errorHandling');
const { badRequest, notFound } = require('../utils/dictionary/statusCode');

const recipesSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});
const idSchema = Joi.string().length(24);
const createRecipes = async (name, ingredients, preparation, userId) => {
  const { error } = recipesSchema.validate({
    name, ingredients, preparation,
  });

  if (error) throw errorConstructor(badRequest, 'Invalid entries. Try again.');
  const id = await create(name, ingredients, preparation, userId);
  return id;
};
const findAllRecipes = async () => {
const showAllRecipes = await findAll();
return showAllRecipes;
};
const findByIdOneRecipe = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) throw errorConstructor(notFound, 'recipe not found');
  const product = await findById(id);

  return product;
};
module.exports = {
  createRecipes,
  findAllRecipes,
  findByIdOneRecipe,
};