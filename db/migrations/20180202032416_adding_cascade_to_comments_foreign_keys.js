exports.up = function(knex, Promise) {
  return knex.schema.table('comments', function (table) {
    table.foreign('topics_id').references('topics.id').onDelete('CASCADE');
    table.foreign('users_id').references('users.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('comments', function (table) {
    table.dropForeign('topics_id');
    table.dropForeign('users_id');
  });
};
