const { ObjectId } = require('mongodb');
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
const findById = async (id) => {
  const db = await connect();
  const insertedId = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  return insertedId;
};
const updateRecipe = async (id, recipe) => {
  const db = await connect();
  const result = await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: recipe },
  );
  return result;
};
const excludeRecipe = async (id) => {
  const db = await connect();
  const recipe = await findById(id);
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return recipe;
};
const uploadImage = async (id, filename) => {
  const db = await connect();
  const result = await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/src/uploads/${filename}` } },
  );
  return result;
};
module.exports = {
  create,
  findAll,
  findById,
  updateRecipe,
  excludeRecipe,
  uploadImage,
};