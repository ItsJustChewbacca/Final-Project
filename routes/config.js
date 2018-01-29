"use strict";

const express = require('express');
const router  = express.Router();
const {getGamesWithControls} = require('../models/config');


router.get('/', (req, res) => {
getGamesWithControls()
  .then(out => {
    console.log('out', out);
    res.render("config", {
      games: out
    });
  });
});

module.exports = router;
