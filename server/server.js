// Local Modules
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Third-Party Modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const {log} = require('@frenzie24/logger')


const sequelize = require('./config/connection');
// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize an instance of Express.js
const app = express();
// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;

//cors handlin
const cors = require("cors"); const corsOptions = { origin: 'http://localhost:5173', credentials: true, optionSuccessStatus: 200, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

app.use(cors(corsOptions)) // Use this after the variable declaration

// Handle preflight (OPTIONS) requests
app.options('*', cors(corsOptions));  // This will ensure preflight requests are handled correctly


// Sets up session and connect to our Sequelize db
// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  // Express session will use cookies by default, but we can specify options for those cookies by adding a cookies property to our session options.
  cookie: {
    // maxAge sets the maximum age for the cookie to be valid. Here, the cookie (and session) will expire after one hour. The time should be given in milliseconds.
    maxAge: 60000000000,
    // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
    httpOnly: true,
    // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
    secure: false,
    // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};
// Add express-session and store as Express.js middleware
app.use(session(sess));


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static middleware pointing to the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Servers the routes to the server
app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    log(`Now listening on http://localhost:${PORT}`, 'white', 'bgBlue')
  );
});
