Map-X
--------
Map-X is a web application that gives users the unique opportunity to use to the same controls throughout multiple Xbox One FPS shooters. E.g. User wants to use the control layout "Bumper-jumper" from Halo 5 in another FPS Xbox game. This app will give the user the tools required to execute this request. Map-X uses the Xbox One accessories application that comes equipped with the Xbox One Elite controller. This Web application also comes stacked with a registration page/login page that gives the registered user the ability to go onto the web apps forums page to engage with the community. The web app also has a home page filled with tips and tricks for xbox One Elite controller owners. The main function of the web app is found on the configuration page, which is where the magic happens. Registered Users are given a profile page where they can change their passwords, emails, usernames etc. 

# Final Product
!['Screenshot of Homepage']()
!['Screenshot of Registration page']()
!['Screenshot of Login page']()
!['Screenshot of profile page']()
!['Screenshot of Configuration page']()
!['Screenshot of Selecting game and conroller layout on configuration page']()
!['Screenshot of Configuration results']()
!['Screenshot of Forums page']()
!['Screenshot of Creating topic on forums page']()
!['Screenshot of Topic Created']()
!['Screenshot of Topic page/ creating comment on topic']()
!['Screenshot of Comment created plus liking comment']()


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies
```
 - Bcryptjs
 - Bluebird
 - Body-parser:
 - Connect-flash
 - Cookie-parser
 - Database-error
 - Dotenv
 - Ejs
 - Express
 - Express-session
 - Express-validator
 - Knex
 - Knex-logger
 - Method-override
 - Morgan
 - Node-sass-middleware
 - Passport
 - Passport-local
 - Pg
```

```
devDependencies
 - Knex-logger
 - Nodemon
 - Sqlite3
 ```
