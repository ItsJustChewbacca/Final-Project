const bcrypt = require("bcryptjs");
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);


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
  knex('users').where('id', id)
}