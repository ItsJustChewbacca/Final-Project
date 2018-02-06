exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('bio', 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('bio');
  });
};
