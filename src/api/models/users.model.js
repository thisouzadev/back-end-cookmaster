// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, email, password) => {
  const db = await connect();
  const { insertedId } = await db.collection('users').insertOne({
    name, email, password,
  });

  return { user: { name, email, role: 'user', _id: insertedId } };
};

const findUser = async (email) => {
  const db = await connect();
  const result = db.collection('users').findOne({ email });
  return result;
};

module.exports = {
  create,
  findUser,
};