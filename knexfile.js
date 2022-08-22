module.exports = {

    development: {
      client: 'mysql',
      connection: {
        filename: path.join(__dirname, 'db')
      },
      migrations: {
        tableName: 'knex_migrations'
      },
      useNullAsDefault: true
    }
  
  };
