exports.seed = function(knex, Promise) {
  return knex("comments")
    .del()
    .then(function() {
      return knex("topics")
        .del()
        .then(function() {
          return knex("users")
            .del()
            .then(function() {
              return Promise.all([
                knex("users").insert({
                  id: 1,
                  first_name: "Alice",
                  last_name: "hippo",
                  username: "ilikehippos",
                  email: "alice@alice.com",
                  password: "123456",
                  confirm_password: "123456"
                }),
                knex("users").insert({ id: 2, first_name: "Bob" }),
                knex("users").insert({ id: 3, first_name: "Charlie" })
              ]).then(function() {
                return Promise.all([
                  knex("topics").insert({
                    id: 1,
                    title: "this app is awesome",
                    description:
                      "this app is really cool because videos are awesome",
                    users_id: 1
                  })
                ]).then(function() {
                  return Promise.all([
                    knex("comments").insert({
                      id: 1,
                      description: "your post sucks",
                      users_id: 2,
                      topics_id: 1
                    })
                  ]);
                });
              });
            });
        });
    });
};
