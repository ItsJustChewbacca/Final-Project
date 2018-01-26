exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', function (table) {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.integer('rating');
    table.integer('users_id').unsigned();
    table.foreign('users_id').references('users.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};
