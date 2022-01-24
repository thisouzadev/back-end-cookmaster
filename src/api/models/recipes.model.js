const connect = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const { insertedId } = await db.collection('recipes').insertOne({
    name, ingredients, preparation, userId,
  });

  return { recipe: { name, ingredients, preparation, userId, _id: insertedId } };
};

const findAll = async () => {
const db = await connect();
const recipe = await db.collection('recipes').find().toArray();
return recipe;
};
module.exports = {
  create,
  findAll,
};