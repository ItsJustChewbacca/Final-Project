"use strict";

const express = require('express');
const router  = express.Router();

const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
var knexLogger = require('knex-logger');
router.use(knexLogger(knex));


router.get('/', (req, res) => {
  knex('topics')
    .leftJoin('users', 'users.id', '=', 'topics.users_id')
    .select('topics.id', 'topics.title', 'topics.created_at', 'users.username')
    .then(topics => {
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
  });
});

router.get('/topics/:id', (req, res) => {
  let topicId = Number(req.params.id);
  // knex('users').join().select(  )
  knex('comments as c')
    .rightJoin('topics as t', 'c.topics_id', '=', 't.id')
    .join('users as usertopic', 'usertopic.id', '=', 't.users_id')
    .leftJoin('users as usercomments', 'usercomments.id', '=', 'c.users_id')
    .select('c.description', 'c.topics_id', 't.id', 't.title', 'c.created_at', 'usertopic.username', 't.description as topicdes', 'usercomments.username as cUsername')
    .where('t.id', '=', topicId)
    .then(comments => {
      let topicTitle = comments[0].title;
      let usernameTopic = comments[0].username;
      let topicDescription = comments[0].topicdes;

      console.log(comments);
      if (comments[0].description === null) {
        comments = [];
      }
      res.render("show_forum_topic.ejs", {comments, topicId, topicTitle, usernameTopic, topicDescription});
    });
});

router.post('/topics/:id', (req, res) => {
  let topicId = req.params.id;
  knex('comments').insert({description: req.body.comment_text, topics_id: topicId}).then(function() {

    res.redirect('/forum/topics/'+ topicId);
  });
});


module.exports = router;