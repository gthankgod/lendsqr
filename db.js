const knex = require('knex');
const config = require('./config/index')



const knexClient = knex({
    client: 'mysql',
    connection: config.dbConfig
});


// Kills the node application

module.exports = knexClient
