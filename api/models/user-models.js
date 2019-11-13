const db = require('../../data/config/db-config.js');

module.exports = {
  find,
  findBy,
  findById,
  add
};

function find() {
  return db('users').select('id', 'username', 'password');
};

function findBy(filter) {
  return db('users').where(filter);
};

function findById(id) {
  return db('users')
    .where({ id })
    .first();
};

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
};