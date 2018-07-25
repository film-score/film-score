const express = require('express')
const path = require('path')
const mw = require('./middleware.js')
const passport = require('passport')

class FilmscoreRouter {
    constructor(app) {
        this.app = app

        this.scoresRouter()
        this.usersRouter()
        this.filmsRouter()

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../react-ui/build/index.html'))
        })
    }

    scoresRouter() {
        let scoresRouter = express.Router()
        scoresRouter.get('/:id', (req, res, next) => mw.GET_query({ table: 'scores', by: 'id' }, req, res, next), (req, res) => { mw.GET_return(req, res) })
        scoresRouter.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => { mw.POST_query({ table: 'scores' }, req, res, next) }, (req, res) => { mw.POST_return(req, res) })
        scoresRouter.delete('/:id', passport.authenticate('jwt', { session: false }), mw.DELETE_query({ table: 'scores' }), (req, res) => { mw.DELETE_return(req, res) })
        this.app.use('/api/scores', scoresRouter)
    }
    
    filmsRouter() {
        let filmsRouter = express.Router()
        filmsRouter.get('/:id', (req, res, next) => {mw.GET_query({ table: 'films' }, req, res, next)}, (req, res) => { mw.GET_return(req, res) })
        filmsRouter.get('/', (req, res, next) => {mw.GET_query({ table: 'films', by: 'query' }, req, res, next)}, (req, res) => { mw.GET_return(req, res) })
        filmsRouter.get('/:id/scores', (req, res, next) => mw.GET_query({ table: 'scores', by: 'film_id' }, req, res, next), (req, res) => { mw.GET_return(req, res) })
        this.app.use('/api/films', filmsRouter)
    }

    usersRouter() {
        let usersRouter = express.Router()
        
        usersRouter.get('/', passport.authenticate('jwt', { session: false }),
            (req, res) => {
                res.json(req.user)
            }
        )

        usersRouter.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => mw.GET_query({ table: 'users' }, req, res, next), (req, res) => { mw.GET_return(req, res) })
        usersRouter.get('/:id/scores', (req, res, next) => mw.GET_query({ table: 'scores', by: 'user_id' }, req, res, next), (req, res) => { mw.GET_return(req, res) })
        usersRouter.post('/', (req, res, next) => { mw.POST_query({ table: 'users' }, req, res, next) }, (req, res) => { mw.POST_return(req, res) })

        usersRouter.post('/auth', passport.authenticate('local'), (req, res) => {
            const { user } = req
            res.status(user.status_code)
            res.cookie('jwt', user.token)
            res.json(user)
        })

        usersRouter.delete('/:id', passport.authenticate('jwt', { session: false }), mw.DELETE_query({ table: 'users' }), (req, res) => { mw.DELETE_return(req, res) })
        this.app.use('/api/users', usersRouter)
    }
}

module.exports = {
    router: app => { new FilmscoreRouter(app) }
}