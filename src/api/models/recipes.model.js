const connect = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const { insertedId } = await db.collection('users').insertOne({
    name, ingredients, preparation, userId,
  });

  return { recipe: name, ingredients, preparation, userId, _id: insertedId };
};

module.exports = {
  create
};