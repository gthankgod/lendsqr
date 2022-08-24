const knex = require('knex');
// const config = require()



const knexClient = knex({
    client: 'mysql',
    connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_HOST
}
    });


// Kills the node application

module.exports = knexClient
