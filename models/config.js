const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

function groupBy(keyGetter, coll){
  const output = {};
  coll.forEach((val, index) => {
    const key = keyGetter(val, index);
    if(output[key] == undefined){
      output[key] = [val];
    } else {
      output[key].push(val);
    }
  });
  return output;
}

module.exports.getGamesWithControls = function () {
   return Promise.all([
    knex('games').select('id', 'title'),
    knex('controls').select('id', 'title', 'games_id', 'mappings')
  ]).then(([games, controls]) => {
    const gamesIndex = {};
    games.forEach((game) => {
      gamesIndex[game.id] = game;
      console.log(gamesIndex);
      game.controls = [];
    });
    controls.forEach((control) => {
      const game = gamesIndex[control.games_id];
      game.controls.push(control);
    });


    // JOEL CODE.  NOT TO BE TRUSTED.
    const groupedControls = groupBy(({games_id}) => games_id, controls);
    const gamesWithControls = games.map(game => {
      game.controls = groupedControls[game.id] || []
      return game;
    });
    console.log('GC', groupedControls);
    console.log('GWC', gamesWithControls);
    // END JOEL CODE.  BURN THE WIZARD.

    return games;
  });
};
