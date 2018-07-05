const db = require('../db')
let moduleExports = module.exports = {}

moduleExports.GET_query = options => {
    let sql

    switch (options.table) {
        case 'scores':
            if (!options.by) { return console.err('What are we querying by, dude?') }
            sql = `SELECT * FROM scores WHERE ${options.by}=$1`
            break;
        case 'films':
            sql = `SELECT * FROM films WHERE id=$1`
            break;
        case 'users':
            sql = `SELECT id, first_name, last_name, email, account_type FROM users WHERE id=$1`
            break;
        default:
            return err('Required param: table')
            break;
    }

    return (req, res, next) => {
        db.query(sql, [req.params.id], (err, results) => {
            if (err) {
                console.error(err)
                res.statusCode = 500
                return res.json({ message: 'Game over, man! Game OVER! Couldn\'t retrieve results.', errors: err })
            }

            if (results.rows.length === 0) {
                res.statusCode = 404
                return res.json({ message: 'There\'s nothing for me here now. No results.', errors: err })
            }

            req.results = results.rows
            next()
        })
    }
}

moduleExports.GET_return = (req, res) => {
    res.json(req.results)
}