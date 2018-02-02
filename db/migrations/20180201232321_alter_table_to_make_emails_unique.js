exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('email');
    table.string('username');
    table.unique('email');
    table.unique('username');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('email');
    table.dropColumn('username');

  });
};
