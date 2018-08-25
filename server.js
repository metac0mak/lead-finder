'use strict';

const Hapi = require('hapi');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

// create mongo connection
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'lead-finder';

MongoClient.connect(dbUrl, function(err, client) {
  assert.equal(null, err);
  console.log(`Connected successfully to mongodb at ${dbUrl}/${dbName}`);

  const db = client.db(dbName);

  client.close();
});

//Load plugins and start server
server.register([
    require('./routes/books')
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});
