dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'filmscore',
}

const pg = require("pg")

const pool = new pg.Pool(dbConfig)

pool.on('error', (err) => {
    console.log('Idle client error ', err.message, err.stack)
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}