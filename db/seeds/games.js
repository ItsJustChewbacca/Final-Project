const data = require('../data');
exports.seed = function(knex, Promise) {
  return knex('controls').del().then(function () {
    return knex('games').del().then(function () {
      return Promise.all([
        knex('games').insert({id: 1, title: 'halo5'}),
        knex('games').insert({id: 2, title: 'Callofduty'})
      ]).then(function () {
        return Promise.all([
          knex('controls').insert({id:1, title: 'default', mappings: data.halo5_default, games_id: 1 }),
          knex('controls').insert({id:2, title: 'green thumb', mappings: data.halo5_green_thumb, games_id: 1 }),
          knex('controls').insert({id:3, title: 'recon', mappings: data.halo5_recon, games_id: 1 }),
          knex('controls').insert({id:4, title: 'fish stick', mappings: data.halo5_fish_stick, games_id: 1 }),
          knex('controls').insert({id:5, title: 'halo 4', mappings: data.halo5_halo4, games_id: 1 }),
          knex('controls').insert({id:6, title: 'boxer', mappings: data.halo5_boxer, games_id: 1 }),
          knex('controls').insert({id:7, title: 'southpaw', mappings: data.halo5_southpaw, games_id: 1 }),
          knex('controls').insert({id:8, title: 'bumper jumper', mappings: data.halo5_bumperjumper, games_id: 1 }),
          knex('controls').insert({id:9, title: 'default', mappings: data.callofduty_default, games_id: 2}),
          knex('controls').insert({id:10, title: 'tatical', mappings: data.callofduty_tatical, games_id: 2}),
          knex('controls').insert({id:11, title: 'lefty', mappings: data.callofduty_lefty, games_id: 2}),
          knex('controls').insert({id:12, title: 'NOM4D', mappings: data.callofduty_NOM4D, games_id: 2}),
          knex('controls').insert({id:13, title: 'NOM4D-tactical', mappings: data.callofduty_NOM4D_tactical, games_id: 2}),
          knex('controls').insert({id:14, title: 'NOM4D-L3F7Y', mappings: data.callofduty_NOM4D_l3f7y, games_id: 2}),
          knex('controls').insert({id:15, title: 'bumper jumper', mappings: data.callofduty_bumper_jumper, games_id: 2}),
          knex('controls').insert({id:16, title: 'bumper jumper-tactical', mappings: data.callofduty_bumper_jumper_tactical, games_id: 2}),
          knex('controls').insert({id:17, title: 'charlie', mappings: data.callofduty_charlie, games_id: 2}),
          knex('controls').insert({id:18, title: 'one-hand-gunslinger', mappings: data.callofduty_one_hand_gunslinger, games_id: 2}),
          knex('controls').insert({id:19, title: 'stick and move', mappings: data.callofduty_stick_and_move, games_id: 2}),
          knex('controls').insert({id:20, title: 'scout', mappings: data.callofduty_scout, games_id: 2}),
          knex('controls').insert({id:21, title: 'brawler', mappings: data.callofduty_brawler, games_id: 2}),
          knex('controls').insert({id:22, title: 'beast', mappings: data.callofduty_beast, games_id: 2})
        ]);
      });
    });
  });
};
