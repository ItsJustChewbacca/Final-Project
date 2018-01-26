exports.up = function(knex, Promise) {
  return knex.schema.createTable('controls', function (table) {
    table.increments('id');
    table.string('title');
    table.json('mappings');
    table.integer('games_id').unsigned();
    table.foreign('games_id').references('games.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('controls');
};
