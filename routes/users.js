"use strict";

const express = require('express');
const router  = express.Router();

const users = {
  "user1": {
    id: "user1"
    first_name: 'Brandon',
    last_name: 'Samuel',
    username: 'bsamuel',
    email: 'brandonsamuel72@gmail.com',
    password: '123',
    confirm_password: '123'
  }
};

router.get('/login', (req, res) => {
  res.render("login");
});

router.get('/register', (req, res) => {
  res.render("register");
});

module.exports = router;
