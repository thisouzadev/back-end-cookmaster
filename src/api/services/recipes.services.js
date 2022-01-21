const Joi = require('@hapi/joi');
const { create } = require('../models/recipes.model');
const errorConstructor = require('../utils/functions/errorHandling');
const { badRequest, conflict, Unauthorized } = require('../utils/dictionary/statusCode');

// const recipesSchema = Joi.object({
//   name: Joi.string().required(),
//   ingredients: Joi.string().required(),
//   preparation: Joi.string().required(),
//   userId: Joi.string().required(),
// });

const createRecipes = async (name, ingredients, preparation, userId) => {
  // const { error } = recipesSchema.validate({
  //   name, ingredients, preparation, userId,
  // });

  // if (error) throw errorConstructor(badRequest, 'Invalid entries. Try again.');
  const id = await create(name, ingredients, preparation, userId);
  return id;
};

module.exports = {
  createRecipes,
};