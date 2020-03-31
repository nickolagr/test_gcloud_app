const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const Knex = require('knex');

var customers = require('./routes/customers'); 
var routes = require('./routes');
var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable('trust proxy');

const connect = () => {
  // Configure which instance and what database user to connect with.
  // Remember - storing secrets in plaintext is potentially unsafe. Consider using
  // something like https://cloud.google.com/kms/ to help keep secrets secret.
  const config = {
    user: process.env.DB_USER, // e.g. 'my-user'
    password: process.env.DB_PASS, // e.g. 'my-user-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
  };

config.host = `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`;
  // Establish a connection to the database
  const knex = Knex({
    client: 'pg',
    connection: config,
  });

const knex = connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.update);

const PORT = process.env.PORT || 8080;
app.listen(PORT,  () => {
    console.log(`Server is running.. on port ${PORT}.`);
});