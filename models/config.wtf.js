const {getGamesWithControls} = require('./config');

getGamesWithControls()
  .then(out => {
    console.log('out', out);
  });
