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
const databaseError = require("database-error");
const Promise = require("bluebird");
const flash = require('connect-flash');



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

  knex('users').where({username: username}).orWhere({email: email}).then(function(users){
      if (users.length) {
        console.log("duplicate user");
        req.flash('errors', 'Username already exists');
        res.redirect("/register");
        return;
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) {
              console.log("bcrypt err:", err);
              req.flash('errors', 'There was a problem creating your account. Please try again.');
              res.redirect("/register");
              return;
            }
            knex('users').insert({
            first_name: first_name,
            last_name: last_name,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hash,
            confirm_password: hash
            })
            .then(function(results){
              console.log("entered into database");
              req.flash('messages', 'Your account has been successfully created. Please login below.');
              res.redirect("/login");
            })
            .catch(function(err){
              console.log("database what now", err);
              req.flash('errors', 'There was a problem creating your account. Please try again.');
              res.redirect("/register");
            });
          });
        });
      }
    });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("gonna check some usernames");
    User.getUserByUsername(username.toLowerCase(), function(err, user){
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

const ensureAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

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

router.get('/dashboard', ensureAuthentication, (req, res) => {
  res.render("profile");
});



router.post('/profile', ensureAuthentication, (req, res) => {
  const { bio, first_name, last_name, email, username,  password, confirm_password } = req.body;
  const id = req.session.passport.user;

  var betterUserData = {};
  const promises = [];
  if (bio) { betterUserData.bio = bio; }
  if (first_name) { betterUserData.first_name = first_name; }
  if (last_name) { betterUserData.last_name = last_name; }
  if (email) {
    promises.push(knex('users').select(1).where('email', email).then((users) => {
      if (users.length) {
        return Promise.reject("email is not unique");
      } else {
        betterUserData.email = email;
      }
    }));
  }
  if (username) { betterUserData.username = username; }
  if (password && confirm_password && password === confirm_password) { promises.push(bcrypt.hash(password, 10).then((hash) => {
    betterUserData.password = hash;
    betterUserData.confirm_password = hash;}));
  }
  Promise.all(promises).then(() => {
    return User.updateUser(id, betterUserData).then(out => {
      console.log('out', out);
      console.log("req.body", req.body);
      res.redirect('/dashboard');
    }).catch((err) => {
      console.error(err);
      res.sendStatus(409);
    });

  });
});



module.exports = router;
