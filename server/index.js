const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const router = require('./router')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sslRedirect = require('heroku-ssl-redirect')

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

/*
 * TODO: This is working and is a disaster. Got to get the genSalt going on user registration so the compare func will work.
 * Have to figure out how to store jwt or soemthing once user is auth'd.
 * 
 */
// bcryptjs.genSalt(10, function (err, salt) {
//     bcryptjs.hash('Panik1221!', salt, function (err, hash) {
//         console.log(hash)
//     });
// });

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    (username, password, cb) => {
        db.query('SELECT id, email, password, account_type FROM users WHERE LOWER(email)=LOWER($1)', [username], (err, result) => {
            if (err) {
                console.error('Error when selecting user on login', err)
                return cb(err)
            }

            if(result.rows.length > 0) {
                const first = result.rows[0]
                bcryptjs.compare(password, first.password, (err, res) => {
                    if (err) {
                        console.error(err)
                    }
                    
                    if (res) {
                        const token = jwt.sign(first, 'your_jwt_secret')
                        cb(null, { id: first.id, name: first.name, email: first.email, type: first.account_type, token: token, status_code: 200, message: "User successfully authenticated!" })
                    } else {
                        cb(null, { status_code: 401, message: 'Incorrect password.' })
                    }
                })
            } else {
                cb(null, { status_code: 401, message: 'That email doesn\'t exist.' })
            }
        })
    })
)

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
    },
    (jwtPayload, cb) => {
        return cb(null, { id: jwtPayload.id, name: jwtPayload.name, email: jwtPayload.email, type: jwtPayload.account_type, status_code: 200, message: "User successfully authenticated!" })
    })
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, cb) => {
    db.query('SELECT id, email, account_type FROM users WHERE id=$1', [parseInt(id, 10)], (err, results) => {
        if(err) {
            console.err('Error when selecting user on session deserialize', err)
            return cb(err)
        }

        cb(null, results.rows[0])
    })
})

const app = express()
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "DELETE");
    next()
})
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, '../react-ui/build')))
app.use(sslRedirect())

router.router(app)

app.listen(process.env.PORT || 8080, () => {
    console.log('Film Score API listening on port 8080')
})