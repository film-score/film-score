const { Client } = require("pg")

// dbConfig = {
//     host: 'localhost',
//     port: 5432,
//     database: 'filmscore',
// }

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})

const pool = client.Pool()

pool.on('error', (err) => {
    console.log('Idle client error ', err.message, err.stack)
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}