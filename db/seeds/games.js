const data = require('../data');
exports.seed = function(knex, Promise) {
  return knex('controls').del().then(function () {
    return knex('games').del().then(function () {
      return Promise.all([
        knex('games').insert({id: 1, title: 'halo5'}),
        knex('games').insert({id: 2, title: 'Callofduty'})
      ]).then(function () {
        return Promise.all([
          knex('controls').insert({id:1, title: 'bumper jumper', mappings: data.halo5_bumperjumper, games_id: 1 }),
          knex('controls').insert({id:2, title: 'default', mappings: data.callofduty_default , games_id:2})
        ]);
      });
    });
  });
};
