const knex = require('knex');



const knexClient = knex({
    client: 'mysql',
    connection: {
    host: 'sql11.freesqldatabase.com',
    user: 'sql11513427',
    password: '9nrAsRaDeN',
    database: 'sql11513427',
    port: 3306}
    });


// Kills the node application

module.exports = knexClient
