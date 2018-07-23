const db = require('./db')
let moduleExports = module.exports = {}

/*
 * GET middleware
 */

// GET Query - set up SQL query based on options
moduleExports.GET_query = (options, req, res, next) => {
    let sql

    switch (options.table) {
        case 'scores':
            if (!options.by) { return console.err('What are we querying by, dude?') }
            if (options.by === 'user_id') {
                sql = `SELECT * FROM ( SELECT *, ( SELECT array_to_json(array_agg(row_to_json(f))) FROM ( SELECT * FROM films WHERE id=scores.film_id ) f ) AS film_info FROM scores WHERE user_id=$1 ) s`;
                break
            }
            sql = `SELECT * FROM scores WHERE ${options.by}=$1`
            break
        case 'films':
            if (options.by === 'query') {
                sql = `SELECT DISTINCT * FROM films WHERE title ILIKE concat('%', $1::varchar, '%');`
                return GET_db(sql, [req.query.q], req, res, next)
            }
            sql = `SELECT * FROM films WHERE id=$1`
            break
        case 'users':
            sql = `SELECT id, first_name, last_name, email, account_type FROM users WHERE id=$1`
            break
        default:
            return console.error('Required param: table')
    }

    return GET_db(sql, [req.params.id], req, res, next)
}

// GET DB - Query DB based on SQL query by resource id.
function GET_db(sql, data, req, res, next) {
    // return (req, res, next) => {
        db.query(sql, data, (err, results) => {
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
    // }
}

moduleExports.GET_return = (req, res) => {
    res.json(req.results)
}

/*
 * POST middleware
 */

// POST Query - Set up SQL query and data for POST requests 
moduleExports.POST_query = (options, req, res, next) => {
    let sql, data

    switch (options.table) {
        case 'users':
            sql = `INSERT INTO users (id, email, password, date_registered, first_name, last_name, account_type)
                    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id`
            data = [
                req.body.email,
                req.body.password,
                new Date(),
                req.body.first_name,
                req.body.last_name,
                'user',
            ]       
            break;
        case 'scores':
            sql = `INSERT INTO scores (id, score_date, film_id, user_id, composite_score, story_score, performance_score, visuals_score, audio_score, construction_score)
                    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`
            data = [
                new Date(),
                req.body.film_id,
                req.user.id,
                req.body.composite_score,
                req.body.story_score,
                req.body.performance_score,
                req.body.visuals_score,
                req.body.audio_score,
                req.body.construction_score,
            ]
            break;
        default:
            return console.error('Required param: table')
            break;
    }

    POST_db(sql, data, req, res, next)
}

// POST DB - Query DB to post based on passed SQL query and data
moduleExports.POST_return = (req, res) => {
    res.json(req.results)
}

// POST DB - Query DB to post based on passed SQL query and data
function POST_db(sql, data, req, res, next) {
    db.query(sql, data, (err, results) => {
        if (err) {
            console.error(err)
            res.statusCode = 500
            return res.json({ message: 'Game over, man! Game OVER! Couldn\'t add resource.', errors: err })
        }

        req.results = results.rows
        next()
    })
}


/*
 * DELETE middleware
 */

// DELETE Query - set up SQL query based on options
moduleExports.DELETE_query = options => {
    let sql

    switch (options.table) {
        case 'scores':
            sql = `DELETE FROM scores WHERE id=$1`
            break;
        case 'users':
            sql = `DELETE FROM users WHERE id=$1`
            break;
        default:
            return console.error('Required param: table')
            break;
    }

    return DELETE_db(sql)
}

// DELETE DB - Query DB based on SQL query by resource id.
function DELETE_db(sql) {
    return (req, res, next) => {
        db.query(sql, [req.params.id], (err, results) => {
            if (err) {
                console.error(err)
                res.statusCode = 500
                return res.json({ message: 'Game over, man! Game OVER! Something went wrong.', errors: err })
            }

            req.results = results
            next()
        })
    }
}

moduleExports.DELETE_return = (req, res) => {
    res.json(req.results)
}