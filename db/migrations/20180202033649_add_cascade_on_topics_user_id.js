exports.up = function(knex, Promise) {
  return knex.schema.table('topics', function (table) {
    table.foreign('users_id').references('users.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('topics', function (table) {
    table.dropForeign('users_id');
  });
};

