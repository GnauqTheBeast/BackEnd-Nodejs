const express = require("express");
const app = express();
const path = require('path');
const port = 3000;
const pug = require("pug");
const routeAdmin = require('./routes/admin/index');
const route = require("./routes/client/index");
const ConnectDb = require('./config/db/index');

// Connect to Db 
ConnectDb();

// Using template engine Pug 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up static middleware first
app.use(express.static(path.join(__dirname, '/public')));

// Then set up routes
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
