const { Pool } = require("pg")

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})

pool.on('error', (err) => {
    console.log('Idle client error ', err.message, err.stack)
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}