const path = require('path')

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'tabtrackerdb',
        user: process.env.DB_USERNAME || 'tabtracker',
        password: process.env.DB_PASSWORD || 'tabtrackerdb', 
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: path.resolve(__dirname, '../../tabtracker.sqlite')
        }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}