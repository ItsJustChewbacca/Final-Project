"use strict";

const express = require('express');
const router  = express.Router();

const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

router.get('/', (req, res) => {
  knex.select('title')
    .from('topics')
    .then(topics => {
      console.log(topics);
      res.render("show_forum.ejs", {topics});
  });
});

router.post('/', (req, res) => {

  if (!req.body.text) {
    console.log('ReqBody', req.body)
    res.status(400).send({ error: 'invalid request: no data in POST body'});
    return;
  }

  knex('topics').insert({title: req.body.text}).then(function() {
    res.redirect('/forum');
  })



});


module.exports = router;