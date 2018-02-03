const bcrypt = require("bcryptjs");
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const express = require('express');
const session = require('express-session');



module.exports.getUserByUsername = function(username, callback) {
  knex('users').where('username', username).asCallback(function(err, users) {
    if(err) return callback(err);
    if(users.length) {
      callback(null, users[0]);
    } else {
      callback(new Error("User not found!"))
    }
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getUserById = function(id, callback) {
  knex('users')
    .where({id})
    .first('*') // Stops the query, and makes clear to other programmers (including Brandon from July 2018 who is explaining his code to someone)
    // .then((user) => {
    //   if(user == null){
    //     callback(null, user);
    //   } else {
    //     callback(new Error('User Not Found'));
    //   }
    // }, (err) => {
    //   callback(err);
    // })
    .asCallback((err, user) => {
    if(err) return callback(err);
    if(user != null) {
      callback(null, user);
    } else {
      callback(new Error("User not found!"))
    }

    })
  // knex('users').where('id', id).asCallback(function(err, users) {
  //   if(err) return callback(err);
  //   if(users.length) {
  //     callback(null, users[0]);
  //   } else {
  //     callback(new Error("User not found!"))
  //   }
  // });
}


module.exports.updateUser = function(id, userData) {
  console.log(userData);
  return knex('users')
    .where({id: id})
    .update(userData);
};

