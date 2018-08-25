'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let Routes = require('./scrapers/scraperRoutes');

(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 3000,
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

    const swaggerOptions = {
      schemes: ['http'],
      documentationPath: '/',
      sortEndpoints: 'path',
      info: {
              title: 'Lead-Finder API Documentation',
              version: "1.0",
          },
    };

    await server.register([
      //require('./scrapers/scraperRoutes'),
      Inert,
      Vision,
          {
              plugin: HapiSwagger,
              options: swaggerOptions
          }
      ]);

      // try {
      //     await server.start();
      //     console.log('Server running at:', server.info.uri);
      // } catch(err) {
      //     console.log(err);
      // }

    server.route({
      method: 'GET',
      path: '/version.{ext}',
      config: {
        auth: false
      },
      handler: {
        file: (request) => `version.${request.params.ext}`
      }
    })

    // Finally, start the server
    await server.start()
      console.log('Runtime information:', { node: process.version })
      console.log('Server started.', {
        uri: server.info.uri
    })

    server.route(Routes);
})()
