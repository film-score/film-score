const express = require('express')
const mw = require('./middleware.js')
const db = require('../db')

class FilmscoreRouter {
    constructor(app) {
        this.app = app

        this.scoresRouter()
        this.usersRouter()
        this.filmsRouter()
    }

    scoresRouter() {
        let scoresRouter = express.Router()
        scoresRouter.get('/:id', mw.GET_query({ table: 'scores', by: 'id' }), (req, res) => { mw.GET_return(req, res) })
        scoresRouter.post('/', (req, res, next) => { mw.POST_query({ table: 'scores' }, req, res, next) }, (req, res) => { mw.POST_return(req, res) })
        scoresRouter.delete('/:id', mw.DELETE_query({ table: 'scores' }), (req, res) => { mw.DELETE_return(req, res) })
        this.app.use('/scores', scoresRouter)
    }
    
    filmsRouter() {
        let filmsRouter = express.Router()
        filmsRouter.get('/:id', mw.GET_query({ table: 'films' }), (req, res) => { mw.GET_return(req, res) })
        filmsRouter.get('/:id/scores', mw.GET_query({ table: 'scores', by: 'film_id' }), (req, res) => { mw.GET_return(req, res) })
        this.app.use('/films', filmsRouter)
    }

    usersRouter() {
        let usersRouter = express.Router()
        usersRouter.get('/:id', mw.GET_query({ table: 'users' }), (req, res) => { mw.GET_return(req, res) })
        usersRouter.get('/:id/scores', mw.GET_query({ table: 'scores', by: 'user_id' }), (req, res) => { mw.GET_return(req, res) })
        usersRouter.post('/', (req, res, next) => { mw.POST_query({ table: 'users' }, req, res, next) }, (req, res) => { mw.POST_return(req, res) })
        // usersRouter.post('/auth', mw.POST_query(), (req, res) => { })
        usersRouter.delete('/:id', mw.DELETE_query({ table: 'users' }), (req, res) => { mw.DELETE_return(req, res) })
        this.app.use('/users', usersRouter)
    }
}

module.exports = {
    router: app => { new FilmscoreRouter(app) }
}