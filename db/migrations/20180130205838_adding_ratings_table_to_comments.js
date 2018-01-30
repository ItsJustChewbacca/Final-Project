exports.up = function(knex, Promise) {
  return knex.schema.table('comments', function (table) {
    table.integer('rating');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('comments', function (table) {
    table.dropColumn('rating');
  });
};
