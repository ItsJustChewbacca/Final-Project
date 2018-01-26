"use strict";

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render("show_forum.ejs");
});

module.exports = router;