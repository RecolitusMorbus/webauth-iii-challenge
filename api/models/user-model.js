const db = require('../../data/config/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db('employees').select('id', 'username', 'department');
};

function findBy(filter) {
  return db('employees').where(filter);
};

function findById(id) {
  return db('employees')
    .where({ id })
    .first()
    .select('id', 'username');
};

async function add(user) {
  const [id] = await db('employees').insert(user);

  return findById(id);
};