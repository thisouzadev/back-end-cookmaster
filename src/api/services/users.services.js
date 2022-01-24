const Joi = require('@hapi/joi');
const { create, findUser } = require('../models/users.model');
const errorConstructor = require('../utils/functions/errorHandling');
const { badRequest, conflict, unauthorized } = require('../utils/dictionary/statusCode');

const usersSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createUsers = async (name, email, password) => {
  const { error } = usersSchema.validate({
    name, email, password,
  });

  if (error) throw errorConstructor(badRequest, 'Invalid entries. Try again.');

  const userFound = await findUser(email);

  if (userFound) throw errorConstructor(conflict, 'Email already registered');

  const id = await create(name, email, password);

  return id;
};

const loginUserValidacao = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw errorConstructor(unauthorized, 'All fields must be filled');

  const user = await findUser(email);

  if (!user || user.password !== password) {
    throw errorConstructor(unauthorized, 'Incorrect username or password');
  }

  return user;
};

module.exports = {
  createUsers,
  loginUserValidacao,
};