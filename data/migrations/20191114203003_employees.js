exports.up = function(knex) {
  return knex.schema.createTable('employees', tbl => {
    tbl.increments();
    tbl
      .string('username', 255)
      .notNullable()
      .unique();
    tbl
      .string('department', 255)
      .notNullable();
    tbl
      .string('password', 255)
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('employees');
};
