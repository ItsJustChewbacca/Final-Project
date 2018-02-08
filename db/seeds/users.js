exports.seed = function(knex, Promise) {
  return knex('comments').del().then(function () {
    return knex('topics').del().then(function () {
      return knex('users').del().then(function () {
        return Promise.all([
          knex('users').insert({id: 1, first_name: 'Alice', last_name: 'bob', username: 'Alice', email: 'alice@alice.com', password: '123456', confirm_password: '123456' }),
          knex('users').insert({id: 2, first_name: 'bobbie', last_name: 'ace', username: 'Bobbie', email: 'bobbie@bobbie.com', password: '123456', confirm_password: '123456'}),
          knex('users').insert({id: 3, first_name: 'Charlie', last_name: 'char', username: 'charlie', email: 'charlie@charlie.com', password: '123456', confirm_password: '123456'})
        ]).then(function() {
          return Promise.all([
            knex('topics').insert({id:1, title: 'Would be cool if Map-X supported Fortnite', description: 'Would be cool if Map-X supported Fortnite. I really need to have some of the control layouts from Call of Duty WW2', users_id:1}),
            knex('topics').insert({id:2, title: 'I really like this app!', description: 'Map-X worked aweseome with my new xbox one elite controller, Its great that I dont have to switch between controls constantly', users_id:2}),
            knex('topics').insert({id:3, title: 'Crazy cool App', description: 'this app is a blast' , users_id:3})
          ]).then(function() {
            return Promise.all([
              knex('comments').insert({id:1, description: 'upvote!', users_id: 2, topics_id: 1}),
              knex('comments').insert({id:2, description: 'you have my upvote', users_id: 1, topics_id: 2})
            ]);
          });
        });
      });
    });
  });
};
