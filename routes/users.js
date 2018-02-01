"use strict";

const express = require('express');
const router  = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const bcrypt = require("bcryptjs");
const bodyParser  = require("body-parser");
const session = require('express-session');

const User = require('../models/users');

router.get('/login', (req, res) => {
  res.render("login");
});

router.get('/register', (req, res) => {
  res.render("register");
});

router.post('/register', function(req, res) {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('first_name', 'First Name is required').notEmpty();
  req.checkBody('last_name', 'Last Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match!').equals(req.body.password);


  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      error: error
    });
  }

    else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if (err) {
            console.log("bcrypt err:", err);
            req.flash('errors', 'There was a problem creating your account. Please try again.');
            res.redirect("/");
            return;
          }
          knex('users').insert({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: hash,
            confirm_password: hash
          }).returning('id')
          .then((id) => {
            console.log(id);
          });
        });
      });

      req.flash('success_msg', 'You are registered and can now login!');

      res.redirect('/login');
    }

});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("gonna check some usernames");
    User.getUserByUsername(username, function(err, user){
      if(err) return done(err);
      if(!user) {
        return done(null, false, {message: 'Unknown User'})
      }
      console.log("no trouble finding username");
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) return done(err);
        if(isMatch) {
          console.log("good user, have a cookie!");
          return done(null, user);
        } else {
          console.log("bad user, no cookie!");
          return done(null, false, {message: 'Invalid Password'})
        }
      })
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local',
   { successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: true })
);


router.get('/logout', (req, res) => {
  req.logout();

  req.flash('success_msg', 'You are now Logged out!');

  res.redirect('/login');
});

router.get('/dashboard', (req, res) => {
  res.render("profile")
});

router.get('/profile', (req, res) => {
  res.render("profile");
});

module.exports = router;
