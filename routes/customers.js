const Knex = require('knex');
// [START cloud_sql_postgres_knex_create]
// Initialize Knex, a Node.js SQL query builder library with built-in connection pooling.
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
  const { Client } = require('pg');
  
  const client = new Client ({
    client: 'pg',
    connection: config,
  });
  
};

client.connect();


exports.list = function (req, res) {

    client.query('SELECT * FROM customer', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('customer/list', { title: "Customers", data: result.rows });
    });

};

exports.add = function (req, res) {
    res.render('customer/add', { title: "Add Customer"  });
};

exports.edit = function (req, res) {

    var id = req.params.id;

    client.query('SELECT * FROM customer WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('customer/edit', { title: "Edit Customer", data: result.rows });
    });

};

exports.save = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.email, req.body.phone];

    client.query('INSERT INTO customer(name, address, email, phone) VALUES($1, $2, $3, $4) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.redirect('/customers');
    });

};

exports.update = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.email, req.body.phone, req.params.id];

    client.query('UPDATE customer SET name=$1, address=$2,email=$3, phone=$4 WHERE id=$5', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.redirect('/customers');
    });

};

exports.delete = function (req, res) {

    var id = req.params.id;

    client.query("DELETE FROM customer WHERE id=$1", [id], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.redirect('/customers');
    });

};


