module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtDuration: process.env.JWT_DURATION,
    dbConfig: {
        client: 'mysql',
        connection: {
        host: process.env.DB_HOST || 'sql11.freesqldatabase.com',
        user: process.env.DB_USER || 'sql11513427',
        password: process.env.DB_PASSWORD || '9nrAsRaDeN',
        database: process.env.DATABASE || 'sql11513427',
        port: process.env.PORT || 3306
    },
    getPasswordRounds: process.env.getPasswordRounds || 5
    }
}
