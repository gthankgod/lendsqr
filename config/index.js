module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtDuration: process.env.JWT_DURATION,
    dbConfig: {
        connection: {
        host: process.env.DB_HOST ,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT 
    },
    getPasswordRounds: process.env.getPasswordRounds || 5
    }
}
