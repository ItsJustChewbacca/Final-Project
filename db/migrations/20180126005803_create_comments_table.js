exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id');
    table.string('description');
    table.integer('users_id').unsigned();
    table.foreign('users_id').references('users.id');
    table.integer('topics_id').unsigned();
    table.foreign('topics_id').references('topics.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
